import styled, { createGlobalStyle } from 'styled-components';

export const CalendarGlobalStyle = createGlobalStyle`
  .rdp-day {
    padding: 20px 0 !important;
    height: 60px !important;
    line-height: 60px !important;
    font-size: 1.1rem;
  }

  .rdp-day_selected,
  .rdp-day_selected:focus {
    height: 60px !important;
    line-height: 60px !important;
  }

  .rdp {
    padding-bottom: 40px;
  }

  .rdp-caption_label,
  .rdp-head_cell {
    font-size: 1.1rem;
  }
`;

export const CalendarWrapper = styled.div`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DayPickerWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;
`;

export const WorkoutListWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  text-align: center;

  p {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  ul {
    text-align: left;

    li {
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
      color: #4a4a4a;
    }
  }
`;
