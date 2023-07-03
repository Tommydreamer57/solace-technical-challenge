import './App.css';
import './components/components.css';
import DataProvider from './contexts/Data';
import Header from './sections/Header/Header';
import Main from './sections/Main/Main';

export default function App() {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </DataProvider>
  );
}
