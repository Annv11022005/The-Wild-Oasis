import styled from 'styled-components';
import Spinner from '../../ui/Spinner';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabin } from '../cabins/useCabin';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoading_1 } = useRecentBookings();
  const { isLoading: isLoading_2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading_3 } = useCabin();

  if (isLoading_1 || isLoading_2 || isLoading_3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
