import { render, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';

test('görev durumu değiştiğinde doğru renk uygulanıyor', () => {
  const { getByText, container } = render(<TaskCard task={mockTask} />);
  const statusButton = getByText('Devam Ediyor');
  fireEvent.click(statusButton);
  expect(container.querySelector('.bg-[#B688FF]')).toBeInTheDocument();
}); 