import random
from deap import base, creator, tools
from calculate_discrepancy import calculate_discrepancy, sort_tasks_by_score
import json

creator.create("FitnessMax", base.Fitness, weights=(1.0,))  # Maximize fitness
creator.create("Individual", list, fitness=creator.FitnessMax)

toolbox = base.Toolbox()
toolbox.register("attr_float", random.uniform, 0.5, 10.0)  # assuming weights are in range 0.5 to 3.0
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_float, n=4)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

import json

def evaluate(individual):
	# Extract weights from individual
	W_deadline, W_importance, W_duration, W_frequency = individual
	
	# Load tasks and add order to them
	with open('tasks.json', 'r') as file:
		tasks = json.load(file)
		for i, task in enumerate(tasks):
			task['order'] = i + 1

	# Load attributes
	with open('attributes.json', 'r') as file:
		attributes = json.load(file)

	# Sort tasks by score
	sorted_tasks = sort_tasks_by_score(tasks, attributes, individual)

	# Calculate discrepancy
	discrepancy = calculate_discrepancy(tasks, sorted_tasks)

	# Since we want to maximize fitness, and a higher discrepancy is bad,
	# you might take the inverse or negative of the discrepancy
	fitness = 1 / discrepancy if discrepancy != 0 else float('inf')

	return fitness,



toolbox.register("mate", tools.cxBlend, alpha=0.5)  # Blend crossover
toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=1, indpb=0.2)  # Gaussian mutation
toolbox.register("select", tools.selTournament, tournsize=3)  # Tournament selection
toolbox.register("evaluate", evaluate)


def main():
	pop = toolbox.population(n=50)  # e.g., 50 individuals
	CXPB, MUTPB, NGEN = 0.7, 0.2, 40  # Cross-over prob, Mutation prob, No. of generations

	# Evaluate the entire population
	fitnesses = list(map(toolbox.evaluate, pop))
	for ind, fit in zip(pop, fitnesses):
		ind.fitness.values = fit

	for gen in range(NGEN):
		# Select parents
		offspring = toolbox.select(pop, len(pop))
		offspring = list(map(toolbox.clone, offspring))

		# Apply crossover and mutation on the offspring
		for child1, child2 in zip(offspring[::2], offspring[1::2]):
			if random.random() < CXPB:
				toolbox.mate(child1, child2)
				del child1.fitness.values
				del child2.fitness.values

		for mutant in offspring:
			if random.random() < MUTPB:
				toolbox.mutate(mutant)
				del mutant.fitness.values

		# Evaluate individuals with an invalid fitness
		invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
		fitnesses = map(toolbox.evaluate, invalid_ind)
		for ind, fit in zip(invalid_ind, fitnesses):
			ind.fitness.values = fit

		# Replace the old population with the offspring
		pop[:] = offspring

	return pop


if __name__ == "__main__":
	population = main()
	top_individual = tools.selBest(population, 1)[0]
	print("Best Individual:", top_individual)
	