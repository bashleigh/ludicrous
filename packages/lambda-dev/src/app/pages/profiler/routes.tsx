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
  const [routes, setRoutes] = useState<Object>({})
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
      {Object.entries(routes).map(([path, routeInfo]) => (
        <div key={path}>
          <Badge intent={methodToIntent(path.split('-')[0])}>{path.split('-')[0]}</Badge>
          {path.split('-')[1]}
          <div>
            {routeInfo.controllerToken}.{routeInfo.method}
          </div>
        </div>
      ))}
    </>
  )
}

export default () => (
  <PageContainer className="el-hfull">
    <PageHeader
      pageTitle={{
        children: 'Routes',
        hasBoldText: true,
      }}
    />
    <Routes />
  </PageContainer>
)
