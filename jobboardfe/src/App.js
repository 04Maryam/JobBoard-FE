import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import JobCategoryList from './components/jobCategory/JobCategoryList';

function App() {
  return (
    <div className="App">
      <Home/>
      <JobCategoryList/>
    </div>
  );
}

export default App;
