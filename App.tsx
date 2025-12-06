import React, { useState, useEffect } from 'react';
import { GameState, GameScenario } from './types';
import { generateScenario } from './services/geminiService';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { BookOpen, TrendingUp, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startGame = async () => {
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const newScenario = await generateScenario();
      setScenario(newScenario);
      setGameState(GameState.PLAYING);
    } catch (e) {
      console.error(e);
      setError("Failed to load market data. Please check your connection or API limit.");
      setGameState(GameState.INTRO);
    }
  };

  const handleSelect = (ticker: string) => {
    setUserChoice(ticker);
    setGameState(GameState.RESULT);
    
    // Update Score
    if (scenario && ticker === scenario.outcome.winnerTicker) {
      setScore(s => s + 1);
    }
    setRounds(r => r + 1);
  };

  const handleNext = () => {
    setUserChoice(null);
    startGame();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <h1 className="font-bold text-xl tracking-tight text-slate-900 serif">Intelligent Investor</h1>
          </div>
          {gameState !== GameState.INTRO && (
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1 text-slate-500">
                <span className="uppercase text-xs tracking-wider">Score</span>
                <span className="text-emerald-600 font-bold text-lg">{score}/{rounds}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative">
        
        {/* Intro State */}
        {gameState === GameState.INTRO && (
          <div className="text-center max-w-2xl px-6 py-12">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 serif text-slate-900">
              Can You Beat the Market?
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Travel back in time. We'll show you the financial statements of two companies. 
              Using the principles of <em>The Intelligent Investor</em>, pick the winner 
              before looking 10 years into the future.
            </p>
            
            {error && (
               <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                  {error}
               </div>
            )}

            <button 
              onClick={startGame}
              className="bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl transition transform hover:scale-105"
            >
              Start Analysis
            </button>
            <p className="mt-4 text-sm text-slate-400">Powered by Gemini AI</p>
          </div>
        )}

        {/* Loading State */}
        {gameState === GameState.LOADING && (
          <div className="flex flex-col items-center text-slate-500">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-emerald-600" />
            <p className="font-medium animate-pulse">Researching historical archives...</p>
          </div>
        )}

        {/* Game State */}
        {gameState === GameState.PLAYING && scenario && (
          <GameScreen scenario={scenario} onSelect={handleSelect} />
        )}

        {/* Result State */}
        {gameState === GameState.RESULT && scenario && userChoice && (
          <ResultScreen scenario={scenario} userChoice={userChoice} onNext={handleNext} />
        )}

      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Intelligent Investor Game. Educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
