import { createStyles } from '@mantine/core';
import { HEADER_HEIGHT } from 'components/layouts/Header';

export const useGlobalStyles = createStyles((theme) => ({
  fullHeighMinusHeader: {
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`
  },

  bg: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  },

  bgSecondary: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
  },

  hidden: {
    display: 'none'
  },

  lgHidden: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none'
    }
  },

  mdHidden: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  smHidden: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  xsHidden: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  lgUpHidden: {
    [theme.fn.largerThan('lg')]: {
      display: 'none'
    }
  },

  mdUpHidden: {
    [theme.fn.largerThan('md')]: {
      display: 'none'
    }
  },

  smUpHidden: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  xsUpHidden: {
    [theme.fn.largerThan('xs')]: {
      display: 'none'
    }
  }
}));
