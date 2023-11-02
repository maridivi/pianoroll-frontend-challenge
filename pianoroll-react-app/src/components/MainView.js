export default function MainView({ selectedPianoroll, pianorolls }) {
  return (
    <div className="main-view">
      <div className="selected-pianoroll">{selectedPianoroll}</div>
      <div className="pianorolls">{pianorolls}</div>
    </div>
  );
}
