import React from 'react';
import Timer from './components/Timer';
import Countdown from './components/Countdown';
import { Container } from './styles/Container.styles';

function App() {
    return (
            <Container>
                <Timer title='Timer' />
                <Countdown title='Countdown' />
            </Container>
    );
}

export default App;
