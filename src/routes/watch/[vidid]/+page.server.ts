import { error } from '@sveltejs/kit';
import { viddata } from '../../../viddata.js';
import type { NodeCue } from 'subtitle';
import fetch from 'node-fetch';
import { parse } from 'subtitle';

interface VideoData {
	vidid: string;
	title: string;
	description: string;
}

const get = async (id: string) => {
	const res = await fetch(`https://raw.githubusercontent.com/ModzabazeR/learnbywatch-subtitles/main/${id}.srt`)
	return res.body
}

export async function load({ params }) {
	const vid = viddata.find((v) => v.vidid === params.vidid);
	const inputStream = await get(params.vidid);
	const subData: NodeCue[] = [];

	await inputStream?.pipe(parse())
		.on('data', (node: NodeCue) => {
			subData.push(node)
		})
		.on('error', (err) => {
			console.error(err);
		})

	return {
		vidData: vid as VideoData,
		subtitleData: await subData,
	};
}
