import styled from 'styled-components';

export const STimer = styled.section`
    width: 100%;
    max-width: 640px;
    padding: 36px;
    border-radius: 6px;
    background: #d6d1d1;
    text-align: center;
`;

export const STimerDisplay = styled.div`
    margin: 26px 80px;
    background: #d6d1d1;
    color: #000000;
    font-family: 'Times New Roman', serif;
    font-size: clamp(32px, 9vw, 56px);
`;

export const STimerActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 26px;
    
`;
