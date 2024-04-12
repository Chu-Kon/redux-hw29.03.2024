import React from 'react'
import { Switch, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import './Header.css'

export default function Header() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <Switch
    className='theme-switcher'
    onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    label="Change theme (Light/Dark)"
    variant="default"
    aria-label="Toggle color scheme"
/>
  )
}
