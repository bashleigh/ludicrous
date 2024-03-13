import React from 'react'
import './styles.css'
import {
  FlexContainer,
  MainContainer,
  NavResponsive,
  NavStateProvider,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
} from '@reapit/elements'
import Link from 'next/link'
import { useRouter } from 'next/router'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component }) {
  const router = useRouter()

  return (
    <NavStateProvider>
      <MainContainer>
        <NavResponsive
          options={[
            {
              itemIndex: 0,
              text: 'dev',
            },
            {
              itemIndex: 1,
              text: 'Profiler',
            },
            {
              itemIndex: 2,
              text: 'Documentation',
            },
            {
              itemIndex: 3,
              text: 'IaaS',
            },
          ]}
        />
        <FlexContainer isFlexAuto>
          <SecondaryNavContainer>
            <SecondaryNav>
              <SecondaryNavItem active={router.pathname === '/profiler'}>
                <Link href="/profiler/">Profiler</Link>
              </SecondaryNavItem>
              <SecondaryNavItem active={router.pathname === '/profiler/routes'}>
                <Link href="/profiler/routes">Routes</Link>
              </SecondaryNavItem>
            </SecondaryNav>
          </SecondaryNavContainer>
          <Component />
        </FlexContainer>
      </MainContainer>
    </NavStateProvider>
  )
}
