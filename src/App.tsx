import './App.css';
import { EmptyContainer } from './empty-container';
import { VirtualScroll } from './virtual-scroll';

function App() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<EmptyContainer />);
  }
  return (
    <div className="App">
      <VirtualScroll items={items} />
    </div>
  );
}

export default App;
