import { Badge, Loader, PageContainer, PageHeader } from '@reapit/elements'
import React, { FC, useEffect, useState } from 'react'
import { methodToIntent } from '../../utils'

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
