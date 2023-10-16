import type { APIContext, GetStaticPaths } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";

const AssetDir = resolve("src", "assets");
const InterRegularPath = join(AssetDir, "Inter-Regular.ttf");
const InterSemiBoldPath = join(AssetDir, "Inter-SemiBold.ttf");

const InterRegular = readFileSync(InterRegularPath);
const InterSemiBold = readFileSync(InterSemiBoldPath);

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	fonts: [
		{
			name: "Inter",
			data: InterRegular,
			weight: 400,
			style: "normal",
		},
		{
			name: "Inter",
			data: InterSemiBold,
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, pubDate: string) => html`<div
	tw="flex flex-col w-full h-full bg-[#000000] text-[#c9cacc]"
>
	<div tw="flex flex-col flex-1 ml-32 mr-32 pt-12 pb-12 justify-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="48"
			viewBox="0 0 506 331"
			class="mb-8"
		>
			<g fill="none" fill-rule="evenodd">
				<circle cx="165.5" cy="165.5" r="165.5" fill="#EF3085"></circle>
				<circle cx="340.5" cy="165.5" r="165.5" fill="#34B6DD"></circle>
				<path
					fill="#42458A"
					d="M253,25.2187885 C299.847155,54.5054142 331,106.481298 331,165.718784 C331,224.95627 299.847155,276.932153 253,306.218779 C206.152852,276.932164 175,224.956276 175,165.718784 C175,106.481291 206.152852,54.5054029 253.000015,25.2187789 Z"
				></path>
			</g>
		</svg>
		<h1 tw="text-6xl font-bold leading-tight text-white mb-4">${title}</h1>
		<p tw="text-2xl leading-none">${siteConfig.title} — ${pubDate}</p>
	</div>
</div>`;

export async function GET({ params: { slug } }: APIContext) {
	const post = await getEntryBySlug("post", slug!);
	const title = post?.data.title ?? siteConfig.title;
	const postDate = getFormattedDate(post?.data.publishDate ?? Date.now(), {
		weekday: "long",
		month: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}

export const getStaticPaths = (async () => {
	const posts = await getCollection("post", ({ data }) => !data.draft);
	return posts
		.filter(({ data }) => !data.ogImage)
		.flatMap(({ slug }) => ({ params: { slug } }));
}) satisfies GetStaticPaths;
