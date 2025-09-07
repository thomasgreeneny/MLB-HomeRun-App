
import React, { useState, useEffect } from 'react';
import type { HomeRun } from './types';
import { fetchWeeklyHomeRuns } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeRunCard from './components/HomeRunCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const [homeRuns, setHomeRuns] = useState<HomeRun[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHomeRuns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchWeeklyHomeRuns();
        // Sort by date, newest first
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setHomeRuns(sortedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getHomeRuns();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (homeRuns.length === 0) {
      return <p className="text-center text-gray-400 mt-12">No home runs found for this week.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {homeRuns.map((hr, index) => (
          <HomeRunCard key={`${hr.playerName}-${index}`} homeRun={hr} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5"
        style={{backgroundImage: "url('https://picsum.photos/seed/mlb-stadium/1920/1080')"}}
      ></div>
      <div className="relative isolate min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
