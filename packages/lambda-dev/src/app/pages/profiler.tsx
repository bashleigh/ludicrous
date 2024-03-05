import { Accordion, Badge, FlexContainer, Intent, Label, Loader, MainContainer, MediaStateProvider, NavResponsive, NavStateProvider, PageContainer, PageHeader, SecondaryNav, SecondaryNavContainer, SecondaryNavItem, Subtitle, Title } from '@reapit/elements'
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

const Profiler: FC<any> = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/profiler')

      setLoading(false)
      const result = await response.json()

      setEvents(result)
    }

    fetchEvents()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Accordion items={events.reverse().map(event => ({
        content: <>
          <Subtitle>Event</Subtitle>
          <Label>Body</Label>
          <pre>{event.event?.body}</pre>
          <Label>Headers</Label>
          <pre>{JSON.stringify(event.event?.headers, undefined, 2)}</pre>
          <Subtitle>Response</Subtitle>
          <Label>Body</Label>
          <pre>{JSON.stringify(event.response?.body, undefined, 2)}</pre>
          <Label>Headers</Label>
          <pre>{JSON.stringify(event.response?.headers, undefined, 2)}</pre>
        </>,
        title: `${event.event.path}`,
        titleItems: [
          <Badge intent={methodToIntent(event.event.httpMethod)}>{event.event.httpMethod}</Badge>,
          <Badge>{event.executionTime}</Badge>
        ],
      }))} />
    </>
  )
}

export default () => (
  <NavStateProvider>
    {/* <MediaStateProvider> */}
      <MainContainer>
        <NavResponsive options={[]} />
        <FlexContainer isFlexGrow1>
          <SecondaryNavContainer>
              <SecondaryNav>
                <SecondaryNavItem
                  active
                  onClick={function Qa(){}}
                >
                  Profiler
                </SecondaryNavItem>
                <SecondaryNavItem
                  onClick={function Qa(){}}
                >
                  Routes
                </SecondaryNavItem>
              </SecondaryNav>
            </SecondaryNavContainer>
            <PageContainer>
              <PageHeader pageTitle={{
                  children: 'Profiler',
                  hasBoldText: true
                }} />
                  <Profiler />
            </PageContainer>
        </FlexContainer>
      </MainContainer>
    {/* </MediaStateProvider> */}
  </NavStateProvider>
)
