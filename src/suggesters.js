import RandomSuggester from './suggesters/random';
import BaileySuggester from './suggesters/bailey';

// Reference your suggester class here using an import statment like above.

// Add a new instance of your suggester here. It will then show up in game.
export default [ new BaileySuggester('Bailey'),
                 new RandomSuggester('Scott\'s randomizer') ];
