import type { WithFitness } from "./types";
/**
 * Selects the two fittest individuals from the population.
 * * @remarks
 * **Warning:** This function expects the population array to be pre-sorted by fitness in descending order.
 * It is highly efficient but offers no genetic diversity (selection pressure is extremely high).
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 * @param population - The current population of individuals. Must be pre-sorted.
 * @returns A promise that resolves to a tuple containing the two fittest individuals.
 * @throws {Error} If the population has fewer than 2 individuals.
 */
declare const fittestSelection: <Entity extends WithFitness>(population: Entity[]) => Promise<[Entity, Entity]>;
/**
 * Selects two individuals completely at random from the population.
 * * @remarks
 * This method ignores fitness values entirely, which maximizes genetic diversity but
 * completely eliminates selection pressure (equivalent to a random search).
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 * @param population - The current population of individuals.
 * @returns A promise that resolves to a tuple containing two randomly chosen individuals.
 * @throws {Error} If the population has fewer than 2 individuals.
 */
declare const randomSelection: <Entity extends WithFitness>(population: Entity[]) => Promise<[Entity, Entity]>;
/**
 * Selects two individuals from the population using tournament selection.
 * * @remarks
 * For each parent selection, two individuals are randomly picked from the population,
 * and their fitness values are compared. The individual with the higher fitness wins the
 * tournament and is selected. This process is repeated twice to select both parents.
 * This method balances genetic diversity and selection pressure.
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 * @param population - The current population of individuals.
 * @returns A promise that resolves to a tuple containing the two tournament winners.
 * @throws {Error} If the population has fewer than 2 individuals.
 */
declare const tournamentSelection: <Entity extends WithFitness>(population: Entity[]) => Promise<[Entity, Entity]>;
/**
 * Selects two individuals from the population using linear ranking selection.
 * * @remarks
 * Linear ranking selection assigns a rank to each individual based on fitness (the fittest
 * is assigned a rank of 1, the second fittest 2, and so on). The probability of an individual
 * being selected is proportional to its rank rather than its absolute fitness.
 * This helps prevent "super-individuals" from prematurely dominating the population.
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 * @param population - The current population of individuals.
 * @returns A promise that resolves to a tuple containing the two selected individuals.
 * @throws {Error} If the population has fewer than 2 individuals.
 */
declare const linearRankingSelection: <Entity extends WithFitness>(population: Entity[]) => Promise<[Entity, Entity]>;
/**
 * Selects two individuals from the population using roulette wheel selection.
 * * @remarks
 * Also known as fitness proportionate selection. Each individual's probability of being selected
 * is directly proportional to its absolute fitness value. Highly fit individuals represent
 * larger slices of the wheel, while weaker individuals represent smaller slices but still retain
 * a non-zero probability of being chosen.
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 * @param population - The current population of individuals.
 * @returns A promise that resolves to a tuple containing the two selected individuals.
 * @throws {Error} If the population has fewer than 2 individuals.
 */
declare const rouletteWheelSelection: <Entity extends WithFitness>(population: Entity[]) => Promise<[Entity, Entity]>;
export { fittestSelection, randomSelection, tournamentSelection, linearRankingSelection, rouletteWheelSelection, };
