import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/generators/meta-tag")({
	component: MetaTagGenerator,
	head: () => ({
		meta: [
			{ title: "Meta Tag Generator | WebToolkit" },
			{
				name: "description",
				content: "Generate SEO, Open Graph, and Twitter meta tags",
			},
		],
	}),
});

function MetaTagGenerator() {
	const [form, setForm] = useState({
		// Basic SEO
		title: "",
		description: "",
		keywords: "",
		author: "",
		robots: "index, follow",

		// Open Graph
		ogTitle: "",
		ogDescription: "",
		ogImage: "",
		ogUrl: "",
		ogType: "website",
		ogSiteName: "",

		// Twitter Card
		twitterCard: "summary_large_image",
		twitterTitle: "",
		twitterDescription: "",
		twitterImage: "",
		twitterSite: "",
	});

	const handleChange = (field: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const generateHtml = () => {
		const lines: string[] = [];

		// Basic SEO
		if (form.title) {
			lines.push(`<!-- HTML Meta Tags -->`);
			lines.push(`<title>${form.title}</title>`);
		}
		if (form.description) {
			lines.push(`<meta name="description" content="${form.description}">`);
		}
		if (form.keywords) {
			lines.push(`<meta name="keywords" content="${form.keywords}">`);
		}
		if (form.author) {
			lines.push(`<meta name="author" content="${form.author}">`);
		}
		if (form.robots) {
			lines.push(`<meta name="robots" content="${form.robots}">`);
		}

		// Open Graph
		const hasOg =
			form.ogTitle ||
			form.ogDescription ||
			form.ogImage ||
			form.ogUrl ||
			form.ogSiteName;
		if (hasOg) {
			lines.push("");
			lines.push(`<!-- Facebook Meta Tags -->`);
			const ogUrl = form.ogUrl || form.ogTitle ? form.ogUrl : "";
			if (ogUrl) {
				lines.push(`<meta property="og:url" content="${ogUrl}">`);
			}
			lines.push(`<meta property="og:type" content="${form.ogType}">`);
			if (form.ogTitle || form.title) {
				lines.push(
					`<meta property="og:title" content="${form.ogTitle || form.title}">`,
				);
			}
			if (form.ogDescription || form.description) {
				lines.push(
					`<meta property="og:description" content="${form.ogDescription || form.description}">`,
				);
			}
			if (form.ogImage) {
				lines.push(`<meta property="og:image" content="${form.ogImage}">`);
			}
			if (form.ogSiteName) {
				lines.push(
					`<meta property="og:site_name" content="${form.ogSiteName}">`,
				);
			}
		}

		// Twitter Cards
		const hasTwitter =
			form.twitterTitle ||
			form.twitterDescription ||
			form.twitterImage ||
			form.twitterSite;
		if (hasTwitter) {
			lines.push("");
			lines.push(`<!-- Twitter Meta Tags -->`);
			lines.push(`<meta name="twitter:card" content="${form.twitterCard}">`);
			if (form.twitterSite) {
				lines.push(`<meta name="twitter:site" content="${form.twitterSite}">`);
			}
			lines.push(
				`<meta name="twitter:title" content="${form.twitterTitle || form.ogTitle || form.title}">`,
			);
			lines.push(
				`<meta name="twitter:description" content="${form.twitterDescription || form.ogDescription || form.description}">`,
			);
			if (form.twitterImage || form.ogImage) {
				lines.push(
					`<meta name="twitter:image" content="${form.twitterImage || form.ogImage}">`,
				);
			}
		}

		return lines.join("\n");
	};

	const codeHtml = generateHtml();

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				{/* Controls sidebar */}
				<div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 pb-6 border-r border-border/50">
					{/* Basic SEO section */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
							Basic SEO
						</h3>
						<div className="space-y-2">
							<Label htmlFor="seo-title">Page Title</Label>
							<Input
								id="seo-title"
								value={form.title}
								onChange={(e) => handleChange("title", e.target.value)}
								placeholder="e.g. My Awesome Website"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="seo-desc">Description</Label>
							<Textarea
								id="seo-desc"
								value={form.description}
								onChange={(e) => handleChange("description", e.target.value)}
								placeholder="Brief summary of the page content..."
								rows={3}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
							<Input
								id="seo-keywords"
								value={form.keywords}
								onChange={(e) => handleChange("keywords", e.target.value)}
								placeholder="e.g. developer, tools, web development"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="seo-author">Author</Label>
							<Input
								id="seo-author"
								value={form.author}
								onChange={(e) => handleChange("author", e.target.value)}
								placeholder="e.g. Jane Doe"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="seo-robots">Robots Directive</Label>
							<Select
								value={form.robots}
								onValueChange={(val) => handleChange("robots", val)}
							>
								<SelectTrigger id="seo-robots">
									<SelectValue placeholder="Select robots rule" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="index, follow">
										index, follow (Default)
									</SelectItem>
									<SelectItem value="noindex, nofollow">
										noindex, nofollow
									</SelectItem>
									<SelectItem value="index, nofollow">
										index, nofollow
									</SelectItem>
									<SelectItem value="noindex, follow">
										noindex, follow
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Open Graph section */}
					<div className="space-y-4 pt-4 border-t border-border/50">
						<h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
							Open Graph (Facebook / LinkedIn)
						</h3>
						<div className="space-y-2">
							<Label htmlFor="og-title">OG Title</Label>
							<Input
								id="og-title"
								value={form.ogTitle}
								onChange={(e) => handleChange("ogTitle", e.target.value)}
								placeholder="If empty, fallback to Page Title"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="og-desc">OG Description</Label>
							<Textarea
								id="og-desc"
								value={form.ogDescription}
								onChange={(e) => handleChange("ogDescription", e.target.value)}
								placeholder="If empty, fallback to Description"
								rows={3}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="og-url">OG URL</Label>
							<Input
								id="og-url"
								value={form.ogUrl}
								onChange={(e) => handleChange("ogUrl", e.target.value)}
								placeholder="e.g. https://example.com/page"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="og-image">OG Image URL</Label>
							<Input
								id="og-image"
								value={form.ogImage}
								onChange={(e) => handleChange("ogImage", e.target.value)}
								placeholder="e.g. https://example.com/og-image.jpg"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="og-site-name">Site Name</Label>
							<Input
								id="og-site-name"
								value={form.ogSiteName}
								onChange={(e) => handleChange("ogSiteName", e.target.value)}
								placeholder="e.g. WebToolkit"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="og-type">OG Type</Label>
							<Select
								value={form.ogType}
								onValueChange={(val) => handleChange("ogType", val)}
							>
								<SelectTrigger id="og-type">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="website">website</SelectItem>
									<SelectItem value="article">article</SelectItem>
									<SelectItem value="profile">profile</SelectItem>
									<SelectItem value="book">book</SelectItem>
									<SelectItem value="music.song">music.song</SelectItem>
									<SelectItem value="video.other">video.other</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Twitter Card section */}
					<div className="space-y-4 pt-4 border-t border-border/50">
						<h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
							Twitter Card
						</h3>
						<div className="space-y-2">
							<Label htmlFor="tw-card">Card Type</Label>
							<Select
								value={form.twitterCard}
								onValueChange={(val) => handleChange("twitterCard", val)}
							>
								<SelectTrigger id="tw-card">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="summary">
										Summary Card (Square image)
									</SelectItem>
									<SelectItem value="summary_large_image">
										Summary Card with Large Image
									</SelectItem>
									<SelectItem value="app">App Card</SelectItem>
									<SelectItem value="player">Player Card</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="tw-site">Twitter Username / Site Handle</Label>
							<Input
								id="tw-site"
								value={form.twitterSite}
								onChange={(e) => handleChange("twitterSite", e.target.value)}
								placeholder="e.g. @username"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="tw-title">Twitter Title</Label>
							<Input
								id="tw-title"
								value={form.twitterTitle}
								onChange={(e) => handleChange("twitterTitle", e.target.value)}
								placeholder="If empty, fallback to OG Title"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="tw-desc">Twitter Description</Label>
							<Textarea
								id="tw-desc"
								value={form.twitterDescription}
								onChange={(e) =>
									handleChange("twitterDescription", e.target.value)
								}
								placeholder="If empty, fallback to OG Description"
								rows={3}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="tw-image">Twitter Image URL</Label>
							<Input
								id="tw-image"
								value={form.twitterImage}
								onChange={(e) => handleChange("twitterImage", e.target.value)}
								placeholder="If empty, fallback to OG Image URL"
							/>
						</div>
					</div>
				</div>

				{/* Output Panel */}
				<div className="flex flex-col space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-lg">Generated HTML Code</h3>
					</div>
					<div className="flex-1">
						{codeHtml ? (
							<CodeOutput
								code={codeHtml}
								language="html"
								label="HTML head tags"
							/>
						) : (
							<div className="flex items-center justify-center min-h-[300px] border border-dashed rounded-lg text-muted-foreground bg-card text-sm p-8 text-center">
								Fill out the form fields on the left to generate your website's
								meta tags.
							</div>
						)}
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
