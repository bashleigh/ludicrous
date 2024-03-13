import { Accordion, Badge, BodyText, Label, Loader, PageContainer, PageHeader, Subtitle } from '@reapit/elements'
import React, { FC, useEffect, useState } from 'react'
import { methodToIntent, statusCodeToIntent } from '../utils'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

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

  return loading ? (
    <Loader />
  ) : (
    <>
      <Accordion
        items={events.reverse().map((event) => ({
          content: (
            <>
              <Subtitle>Event</Subtitle>
              <Label>Body</Label>
              <SyntaxHighlighter language="json" style={dracula} showLineNumbers={true}>
                {event.event?.body}
              </SyntaxHighlighter>
              <Label>Headers</Label>
              <SyntaxHighlighter language="json" style={dracula} showLineNumbers={true}>
                {JSON.stringify(event.event?.headers, undefined, 2)}
              </SyntaxHighlighter>
              <Subtitle>Response</Subtitle>
              <Label>Body</Label>
              <SyntaxHighlighter language="json" style={dracula} showLineNumbers={true}>
                {JSON.stringify(event.response?.body, undefined, 2)}
              </SyntaxHighlighter>
              <Label>Headers</Label>
              <SyntaxHighlighter language="json" style={dracula} showLineNumbers={true}>
                {JSON.stringify(event.response?.headers, undefined, 2)}
              </SyntaxHighlighter>
              {event.controller && (
                <>
                  <Label>Code</Label>
                  <BodyText>
                    {event?.controller?.controller}.{event?.controller?.method}
                  </BodyText>
                  <SyntaxHighlighter language="typescript" style={dracula} showLineNumbers={true}>
                    {event?.controller?.code}
                  </SyntaxHighlighter>
                </>
              )}
            </>
          ),
          title: `${event.event.path}`,
          titleItems: [
            event?.controller && (
              <Badge>
                {event?.controller?.controller}.{event?.controller?.method}
              </Badge>
            ),
            <Badge intent={methodToIntent(event.event.httpMethod)}>{event.event.httpMethod}</Badge>,
            <Badge>{event.executionTime}</Badge>,
            <Badge intent={statusCodeToIntent(event.response.statusCode)}>{event.response.statusCode}</Badge>,
          ],
        }))}
      />
    </>
  )
}

export default () => {
  const [location, setLocation] = useState<string | undefined>()

  useEffect(() => {
    setLocation(window.location.host)
  }, [])

  return (
    <PageContainer className="el-hfull">
      <PageHeader
        pageTitle={{
          children: 'Profiler',
          hasBoldText: true,
        }}
        pageInfo={[
          {
            children: <Link href={`http://${location}`}>http://{location}</Link>,
          },
        ]}
      />
      <Profiler />
    </PageContainer>
  )
}
