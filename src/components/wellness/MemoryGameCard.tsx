import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw } from 'lucide-react';

const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🥑', '🥕'];

const MemoryGameCard = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards and shuffle them
    const cardPairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
    
    setCards(cardPairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    // Start game on first click
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Don't allow more than 2 cards flipped at once
    if (flipped.length === 2) return;
    
    // Don't allow clicking on already matched or flipped cards
    if (matched.includes(id) || flipped.includes(id)) return;
    
    // Add card to flipped array
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // Check for game completion
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameComplete(true);
    }
  }, [matched, cards]);

  return (
    <Card className="border-purple-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-100 to-purple-50 px-5 py-3 border-b border-purple-200">
        <h3 className="font-medium flex items-center text-purple-700">
          <Brain className="mr-2 h-4 w-4" />
          Memory Game
        </h3>
      </div>
      
      <CardContent className="p-5">
        {gameComplete ? (
          <div className="text-center py-4">
            <h4 className="text-lg font-medium mb-2">Well done! 🎉</h4>
            <p className="text-gray-600 mb-4">You completed the game in {moves} moves</p>
            <Button onClick={initializeGame}>
              <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">Moves: {moves}</p>
              <Button variant="outline" size="sm" onClick={initializeGame}>
                <RefreshCw className="mr-1 h-3 w-3" /> Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`aspect-square flex items-center justify-center rounded-md cursor-pointer text-2xl transition-all duration-300 transform 
                  ${matched.includes(card.id) ? 'bg-green-100 text-green-600 scale-95' : 
                    flipped.includes(card.id) ? 'bg-blue-100 text-blue-600 scale-105' : 
                    'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {(flipped.includes(card.id) || matched.includes(card.id)) ? card.emoji : ''}
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              {!gameStarted ? 'Click any card to start' : 'Find all matching pairs'}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryGameCard;