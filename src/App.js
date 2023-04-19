import './App.css';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ol>
          <li>Add Axios</li>
          <li>Connect to GitHub</li>
          <li>Connect to Netlify and publish</li>
        </ol>
        <Weather city="Wrocław"/>
      </header>
    </div>
  );
}

export default App;
