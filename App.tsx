
import React, { useState, useEffect } from 'react';
import type { HomeRun, Source } from './types';
import { fetchWeeklyHomeRuns } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeRunCard from './components/HomeRunCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import SourcesDisplay from './components/SourcesDisplay';

function App() {
  const [homeRuns, setHomeRuns] = useState<HomeRun[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  useEffect(() => {
    const getHomeRuns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { homeRuns: data, sources: fetchedSources } = await fetchWeeklyHomeRuns();
        
        // Ensure data is an array before sorting
        const validData = Array.isArray(data) ? data : [];
        
        // Sort by date, newest first
        const sortedData = validData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setHomeRuns(sortedData);
        setSources(fetchedSources || []);
        
        // Populate teams for the filter dropdown
        const uniqueTeams = [...new Set(sortedData.map(hr => hr.team))].sort();
        setTeams(uniqueTeams);

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

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  const filteredHomeRuns = homeRuns.filter(hr => 
    selectedTeam === 'all' || hr.team === selectedTeam
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    
    const hasData = homeRuns.length > 0;
    const hasFilteredData = filteredHomeRuns.length > 0;

    return (
      <>
        {hasData && (
          <div className="mb-8 flex justify-end">
            <div className="relative">
              <label htmlFor="team-filter" className="absolute -top-3 left-3 bg-gray-900 px-1 text-xs text-gray-400">Filter by Team</label>
              <select
                id="team-filter"
                value={selectedTeam}
                onChange={handleTeamChange}
                className="bg-gray-800/50 border border-gray-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                aria-label="Filter home runs by team"
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {!hasData && (
           <p className="text-center text-gray-400 mt-12">No home runs found for this week.</p>
        )}

        {hasData && !hasFilteredData && (
           <p className="text-center text-gray-400 mt-12">{`No home runs found for ${selectedTeam} this week.`}</p>
        )}
        
        {hasFilteredData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredHomeRuns.map((hr, index) => (
              <HomeRunCard key={`${hr.playerName}-${hr.date}-${index}`} homeRun={hr} />
            ))}
          </div>
        )}

        <SourcesDisplay sources={sources} />
      </>
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
