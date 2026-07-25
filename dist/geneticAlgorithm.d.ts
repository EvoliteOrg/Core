import type { WithFitness, geneticAlgorithmOptions, fitnessFunction, selectionMethod, mutationMethod, crossoverMethod } from "./types";
/**
 * Main class for running an asynchronous Genetic Algorithm.
 * Allows optimizing (maximizing or minimizing) a population of entities based on
 * custom fitness, selection, crossover, and mutation functions.
 * * @template Entity - The type of object representing an individual. Must extend {@link WithFitness}.
 */
declare class GeneticAlgorithm<Entity extends WithFitness> {
    /**
     * The current generation number in the evolutionary process.
     * Starts at 1 and increments with each successful evolution step.
     */
    generation: number;
    /**
     * The current population of individuals in their current evolutionary state.
     */
    population: Entity[];
    /** @internal Original backup population used for performing resets. */
    private initialPopulation;
    /** @internal Maximum limit of individuals allowed per generation. */
    private maxPopulationSize;
    /** @internal Probability (from 0 to 1) of a child undergoing mutation. */
    private mutationRate;
    /** @internal Indicates whether the best individual of the current generation passes untouched to the next. */
    private fittestAlwaysSurvives;
    /** @internal Enables or disables console log output during evolution. */
    private logging;
    /** @internal Frequency (in generations) with which logs are printed. */
    private loggingInterval;
    /** @internal Target fitness value which, when reached, immediately stops the evolution. */
    private fitnessObjective;
    /** @internal Yielding frequency (voluntary asynchronous pause) to avoid blocking the event loop. */
    private yieldEvery;
    /** @internal Control flag to safely abort asynchronous execution. */
    private shouldStop;
    /** @internal Determines whether we aim to maximize or minimize the fitness. */
    private optimization;
    /** @internal Fitness evaluation function. */
    protected fitnessFunction?: fitnessFunction<Entity>;
    /** @internal Strategy for selecting parents for the next generation. */
    private selectionMethod?;
    /** @internal Operator to genetically alter a child individual. */
    private mutationMethod?;
    /** @internal Operator to combine two parents and create a child. */
    private crossoverMethod?;
    /**
     * Initializes a new instance of the Genetic Algorithm.
     * * @param options - Initial configuration object implementing {@link geneticAlgorithmOptions}.
     * @throws {Error} If the initial population contains 1 or fewer individuals.
     * @throws {Error} If the maximum population size (`maxPopulationSize`) is less than or equal to 1.
     */
    constructor({ initialPopulation, maxPopulationSize, mutationRate, fittestAlwaysSurvives, optimization, logging, loggingInterval, fitnessObjective, yieldEvery, }: geneticAlgorithmOptions<Entity>);
    /**
     * Sets the fitness function to evaluate each individual in the population.
     * * @param fitnessFunction - Asynchronous function that calculates and returns the numerical fitness value.
     * @returns The `GeneticAlgorithm` instance to enable method chaining (fluent API).
     */
    setFitnessFunction(fitnessFunction: fitnessFunction<Entity>): GeneticAlgorithm<Entity>;
    /**
     * Sets the parent selection method.
     * * @param selectionMethod - Function responsible for choosing two parents from the current population.
     * @returns The `GeneticAlgorithm` instance to enable method chaining (fluent API).
     */
    setSelectionMethod(selectionMethod: selectionMethod<Entity>): GeneticAlgorithm<Entity>;
    /**
     * Sets the mutation method for the created children.
     * * @param mutationMethod - Function that randomly alters features of a child individual.
     * @returns The `GeneticAlgorithm` instance to enable method chaining (fluent API).
     */
    setMutationMethod(mutationMethod: mutationMethod<Entity>): GeneticAlgorithm<Entity>;
    /**
     * Sets the crossover method to mix the genetic code of the parents.
     * * @param crossoverMethod - Function that takes two parents and returns a new child combining their properties.
     * @returns The `GeneticAlgorithm` instance to enable method chaining (fluent API).
     */
    setCrossoverMethod(crossoverMethod: crossoverMethod<Entity>): GeneticAlgorithm<Entity>;
    /**
     * Immediately stops the ongoing asynchronous evolution process (`evolve`) upon completing the current step.
     */
    stop(): void;
    /**
     * Stops any active execution and fully resets the state of the algorithm
     * (generation back to 1 and population reset to the original initial population).
     */
    reset(): void;
    /**
     * Executes a single step (generation) of the genetic algorithm lifecycle internally.
     * * The lifecycle consists of:
     * 1. Evaluating the fitness of the entire population concurrently.
     * 2. Sorting individuals based on the optimization criteria.
     * 3. Checking if the fittest individual has met the target fitness objective.
     * 4. Generating offspring through selection, crossover, and mutation processes.
     * * @returns A boolean indicating whether the target fitness objective (`fitnessObjective`) has been successfully met.
     * @throws {Error} If any of the required methods (fitness, crossover, selection, mutation) have not been set.
     * @throws {Error} If the population becomes empty during the process.
     * @internal
     */
    private step;
    /**
     * Starts or continues the evolution process for a given number of generations.
     * The process will stop early if the `fitnessObjective` is met or if `stop()` is manually invoked.
     * * @param generations - The maximum number of generations/cycles to run.
     * @param callback - Optional lifecycle callback triggered after each generation completes.
     * @returns A promise that resolves with the fittest individual found in the final population.
     * @throws {Error} If the population becomes empty or corrupted at any point during evolution.
     */
    evolve(generations: number, callback?: (generation: number, population: Entity[], fittest: Entity) => void | Promise<void>): Promise<Entity>;
}
export { GeneticAlgorithm };
