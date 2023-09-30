import { error } from '@sveltejs/kit';
import { viddata } from '../../../viddata.js';
import { parseSync } from 'subtitle'
import fs from 'fs'

interface VideoData {
	vidid: string;
	title: string;
	description: string;
}

export function load({ params }) {
	const vid = viddata.find((v) => v.vidid === params.vidid);
	const fileUrl = new URL(`./${params.vidid}.srt`, import.meta.url);
	const input = fs.readFileSync(fileUrl, 'utf8')
	
	return {
		vidData: vid as VideoData,
		subtitleData: Array.from(parseSync(input)),
	};
}
