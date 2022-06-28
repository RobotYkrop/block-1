import { createRoot } from 'react-dom/client';

import App from './components/App/App';

const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App />);
