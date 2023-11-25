import { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  try {
    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' })

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"')

    ffmpeg(format.url)
      .audioBitrate(128)
      .format('mp3')
      .pipe(res)
  } catch (error) {
    res.status(500).json({ error: 'Failed to download and convert video' })
  }
}