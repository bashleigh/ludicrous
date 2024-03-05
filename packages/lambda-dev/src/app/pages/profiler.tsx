import { Accordion, Badge, FlexContainer, Label, Loader, MainContainer, NavResponsive, NavStateProvider, PageContainer, PageHeader, SecondaryNav, SecondaryNavContainer, SecondaryNavItem, Subtitle, Title } from '@reapit/elements'
import React, { FC, useEffect, useState } from 'react'

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
      <Accordion items={events.map(event => ({
        content: <>
          <Subtitle>Event</Subtitle>
          <Label>Body</Label>
          <code>{event.event?.body}</code>
          <Label>Headers</Label>
          <code>{event.event?.headers}</code>
          <Subtitle>Response</Subtitle>
          <Label>Body</Label>
          <code>{event.response?.body}</code>
          <Label>Headers</Label>
          <code>{event.response?.headers}</code>
        </>,
        title: event.event.path,
        titleItems: [
          <Badge>{event.event.httpMethod}</Badge>,
        ],
      }))} />
    </>
  )
}

export default () => (
<NavStateProvider>
  <MainContainer>
  <NavResponsive options={[]} />
    <FlexContainer>
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
</NavStateProvider>
)
