
import './App.css';
import Homepage from './components/Homepage';
import Example from './components/Example';

function App() {
  return (
   <>
   <Homepage />
   
   <div className='card-container'>
   <Example name="Kabaddi"/>
   <Example name="Football" />
   <Example name="Hockey" />
   <Example name="Basket Ball" />
   <Example name="Volley Ball" />
   <Example name="Shuttle" />
   <Example name="Ball Badmitton" />
   <Example name="Athletics" />
   <Example name="Table Tennis" />
   </div>

   </>
  );
}

export default App;
