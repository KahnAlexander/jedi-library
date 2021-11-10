import { styled } from '@mui/material/styles';

const CustomBadge = styled('div')(({ theme }) => ({
  padding: '6px 8px 6px 8px',
  borderRadius: '18px',
  backgroundColor: '#1976d2',
  fontSize: theme.typography.pxToRem(14),
  color: '#fff'
}));

export default CustomBadge;