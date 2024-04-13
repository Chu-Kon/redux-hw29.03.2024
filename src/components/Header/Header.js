import React, { useState } from 'react';
import { Switch, useMantineColorScheme, useComputedColorScheme, SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import './Header.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <SegmentedControl 
      className='lang-switcher'
      withItemsBorders={false} 
      radius='xl' 
      value={selectedLanguage}
      onChange={(language) => {
        setSelectedLanguage(language);
        if (language === 'Eng') {
          i18n.changeLanguage('en');
        } else if (language === 'Рус') {
          i18n.changeLanguage('ru');
        }
      }}
      data={[
        { label: 'Eng', value: 'Eng' },
        { label: 'Рус', value: 'Рус' }
      ]}
    />
  );
};


export default function Header() {
  const { t } = useTranslation('header');
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  
  return (
    <>
      <LanguageSwitcher />
      <Switch
        className='theme-switcher'
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        label={t('theme-text')}
        variant='default'
        aria-label='Toggle color scheme'
      />
    </>
  );
}