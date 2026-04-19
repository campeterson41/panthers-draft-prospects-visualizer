import { useState, useMemo } from 'react';
import { allProspects, YEARS } from './data/meetings';
import Header from './components/Header';
import ByPosition from './components/ByPosition';
import Top30Grid from './components/Top30Grid';
import MultiTouch from './components/MultiTouch';
import MeetingBreakdown from './components/MeetingBreakdown';
import ByRound from './components/ByRound';
import ProspectTable from './components/ProspectTable';
import PlayerProfile from './components/PlayerProfile';
import IntelTab from './components/IntelTab';
import PrototypesTab from './components/PrototypesTab';
import ScatterPlot from './components/ScatterPlot';
import PositionInvestmentChart from './components/PositionInvestmentChart';
import styles from './App.module.css';

const TABS = [
  { id: 'signal', label: 'Signal' },
  { id: 'prototypes', label: 'Prototypes' },
  { id: 'position', label: 'By Position' },
  { id: 'top30', label: 'Top 30 Visits' },
  { id: 'multitouch', label: 'Multi-Touch' },
  { id: 'byMeeting', label: 'By Meeting' },
  { id: 'byRound', label: 'By Round' },
  { id: 'all', label: 'All Prospects' },
  { id: 'intel', label: 'Draft Intel' },
];

function App() {
  const [activeTab, setActiveTab] = useState('signal');
  const [filterPosition, setFilterPosition] = useState(null);
  const [year, setYear] = useState(2026);
  const [selectedProspect, setSelectedProspect] = useState(null);

  const prospects = allProspects[year];

  const filtered = useMemo(
    () => filterPosition ? prospects.filter(p => p.position === filterPosition) : prospects,
    [prospects, filterPosition]
  );

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    if (tabId !== 'position') setFilterPosition(null);
  }

  function handlePositionClick(pos) {
    setFilterPosition(pos);
    if (pos) setActiveTab('position');
  }

  return (
    <>
      <Header
        prospects={prospects}
        filterPosition={filterPosition}
        onFilterChange={setFilterPosition}
        year={year}
        onYearChange={setYear}
      />

      <nav className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className={styles.content}>
        {activeTab === 'signal' && (
          <div>
            <div className={styles.signalLayout}>
              <div className={styles.signalMain}>
                <h2 className={styles.signalTitle}>Scouting Interest vs. Board Rank</h2>
                <p className={styles.signalDesc}>
                  Each dot is a ranked prospect. Vertical gold lines mark Panthers pick slots.
                  Dot size = touch count. Brighter dots = Top 30 or multi-touch.
                </p>
                <ScatterPlot prospects={prospects} year={year} onPlayerClick={setSelectedProspect} />
              </div>
              <div className={styles.signalSide}>
                <h2 className={styles.signalTitle}>Position Investment vs. Roster Need</h2>
                <p className={styles.signalDesc}>
                  Blue bar = Top 30 meetings. Light bar = all other meetings.
                  Need level from 1–10 on right.
                </p>
                <PositionInvestmentChart
                  prospects={prospects}
                  onPositionClick={handlePositionClick}
                  activePosition={filterPosition}
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'position' && (
          <ByPosition prospects={prospects} filterPosition={filterPosition}
            onFilterChange={setFilterPosition} onPlayerClick={setSelectedProspect} />
        )}
        {activeTab === 'top30' && <Top30Grid prospects={filtered} onPlayerClick={setSelectedProspect} />}
        {activeTab === 'multitouch' && <MultiTouch prospects={filtered} onPlayerClick={setSelectedProspect} />}
        {activeTab === 'byMeeting' && <MeetingBreakdown prospects={filtered} onPlayerClick={setSelectedProspect} />}
        {activeTab === 'byRound' && <ByRound prospects={filtered} onPlayerClick={setSelectedProspect} />}
        {activeTab === 'prototypes' && <PrototypesTab onPlayerClick={setSelectedProspect} />}
        {activeTab === 'all' && <ProspectTable prospects={filtered} onPlayerClick={setSelectedProspect} />}
        {activeTab === 'intel' && <IntelTab />}
      </div>

      <PlayerProfile
        prospectName={selectedProspect}
        isOpen={!!selectedProspect}
        onClose={() => setSelectedProspect(null)}
      />
    </>
  );
}

export default App;
