import {
  Accordion,
  Badge,
  FlexContainer,
  Intent,
  Label,
  Loader,
  MainContainer,
  MediaStateProvider,
  NavResponsive,
  NavStateProvider,
  PageContainer,
  PageHeader,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

const methodToIntent = (method: string): Intent => {
  switch (method) {
    case 'GET':
      return 'primary'
    case 'POST':
      return 'success'
    case 'PUT':
    case 'PATCH':
      return 'low'
    case 'DELETE':
      return 'danger'
    default:
      return 'default'
  }
}

const Routes: FC<any> = () => {
  const [routes, setRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/profiler/routes')

      setLoading(false)
      const result = await response.json()

      setRoutes(result)
    }

    fetchRoutes()
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1>Routes</h1>
    </>
  )
}

export default () => (
  <NavStateProvider>
    {/* <MediaStateProvider> */}
    <MainContainer>
      <NavResponsive options={[]} />
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SecondaryNav>
            <SecondaryNavItem
              >
              <Link href="/profiler">Profiler</Link>
            </SecondaryNavItem>
            <SecondaryNavItem
              active
            >
              <Link href="/profiler/routes">Routes</Link>
            </SecondaryNavItem>
          </SecondaryNav>
        </SecondaryNavContainer>
        <PageContainer className="el-hfull">
          <PageHeader
            pageTitle={{
              children: 'Router',
              hasBoldText: true,
            }}
          />
          <Routes />
        </PageContainer>
      </FlexContainer>
    </MainContainer>
    {/* </MediaStateProvider> */}
  </NavStateProvider>
)
