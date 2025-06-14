import styled from 'styled-components';
import Spinner from '../../ui/Spinner';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabin } from '../cabins/useCabin';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoading_1 } = useRecentBookings();
  const {
    stays,
    isLoading: isLoading_2,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading_3 } = useCabin();

  console.log(stays);

  if (isLoading_1 || isLoading_2 || isLoading_3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today`s activiti</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
