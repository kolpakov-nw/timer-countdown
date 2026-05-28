import styled from 'styled-components';

export const SCountdown = styled.section`
    width: 100%;
    max-width: 640px;
    padding: 32px;
    border-radius: 8px;
    background: #d6d1d1;
`;

export const SCountdownInput = styled.div`
    margin-top: 28px;
`;

export const SInputFields = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin: 16px 0 24px;
`;
export const SCountdownResult = styled.div`
    margin-top: 28px;
`;

export const SCountdownDisplay = styled.div`
    margin: 16px 0;
    padding: 20px;
    border-radius: 8px;
    background: #d6d1d1;
    color: #08090b;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
    font-size: clamp(36px, 10vw, 64px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    text-align: center;
`;

export const SProgress = styled.div`
    display: grid;
    gap: 8px;
`;

export const SCountdownActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 28px;
    
`;
