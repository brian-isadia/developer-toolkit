import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/preview/open-graph")({
	component: OpenGraphPreview,
	head: () => ({
		meta: [
			{ title: "Open Graph Preview | WebToolkit" },
			{
				name: "description",
				content: "Preview how your page appears on social platforms",
			},
		],
	}),
});

function OpenGraphPreview() {
	const [form, setForm] = useState({
		title: "Antigravity AI - Advanced Agentic Coding",
		description:
			"Supercharge your software development team with autonomous AI coding agents that build, test, and deploy features in minutes.",
		imageUrl:
			"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
		url: "https://webtoolkit.dev",
		siteName: "WebToolkit",
		twitterCard: "summary_large_image",
	});

	const handleChange = (field: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const getDomain = (urlStr: string) => {
		try {
			if (!urlStr) return "example.com";
			const cleanUrl = urlStr.startsWith("http") ? urlStr : `https://${urlStr}`;
			const url = new URL(cleanUrl);
			return url.hostname.replace("www.", "");
		} catch {
			return "example.com";
		}
	};

	const domain = getDomain(form.url);

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				{/* Inputs Sidebar */}
				<div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 pb-6 border-r border-border/50">
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
							OG Metadata
						</h3>

						<div className="space-y-2">
							<Label htmlFor="og-title">Title</Label>
							<Input
								id="og-title"
								value={form.title}
								onChange={(e) => handleChange("title", e.target.value)}
								placeholder="e.g. My Website Title"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="og-desc">Description</Label>
							<Textarea
								id="og-desc"
								value={form.description}
								onChange={(e) => handleChange("description", e.target.value)}
								placeholder="e.g. This is a description of my site..."
								rows={4}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="og-image">Image URL</Label>
							<Input
								id="og-image"
								value={form.imageUrl}
								onChange={(e) => handleChange("imageUrl", e.target.value)}
								placeholder="e.g. https://example.com/cover.png"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="og-url">Page URL</Label>
							<Input
								id="og-url"
								value={form.url}
								onChange={(e) => handleChange("url", e.target.value)}
								placeholder="e.g. https://example.com/about"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="og-site">Site Name</Label>
							<Input
								id="og-site"
								value={form.siteName}
								onChange={(e) => handleChange("siteName", e.target.value)}
								placeholder="e.g. WebToolkit"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="twitter-card">Twitter Card Type</Label>
							<Select
								value={form.twitterCard}
								onValueChange={(val) => handleChange("twitterCard", val)}
							>
								<SelectTrigger id="twitter-card">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="summary">
										Summary Card (Small Image)
									</SelectItem>
									<SelectItem value="summary_large_image">
										Summary Card with Large Image
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Previews Panel */}
				<div className="space-y-6">
					<Tabs defaultValue="facebook" className="w-full">
						<TabsList className="grid grid-cols-4 w-full max-w-[500px]">
							<TabsTrigger
								value="facebook"
								className="flex items-center gap-1.5"
							>
								<Facebook className="size-3.5 text-[#1877F2]" /> Facebook
							</TabsTrigger>
							<TabsTrigger
								value="twitter"
								className="flex items-center gap-1.5"
							>
								<Twitter className="size-3.5 text-[#1DA1F2]" /> Twitter / X
							</TabsTrigger>
							<TabsTrigger
								value="linkedin"
								className="flex items-center gap-1.5"
							>
								<Linkedin className="size-3.5 text-[#0A66C2]" /> LinkedIn
							</TabsTrigger>
							<TabsTrigger
								value="discord"
								className="flex items-center gap-1.5"
							>
								<MessageSquare className="size-3.5 text-[#5865F2]" /> Discord
							</TabsTrigger>
						</TabsList>

						{/* Facebook Preview Card */}
						<TabsContent value="facebook" className="pt-6">
							<div className="max-w-[550px] bg-background border border-border rounded-xl overflow-hidden shadow-sm">
								<div className="bg-[#f0f2f5] dark:bg-[#18191a] p-4 text-xs font-semibold flex items-center gap-2 border-b border-border/40 text-muted-foreground">
									<span>Facebook Link Preview</span>
								</div>
								{form.imageUrl && (
									<div className="aspect-[1.91/1] w-full overflow-hidden bg-muted flex items-center justify-center border-b border-border/40 relative">
										<img
											src={form.imageUrl}
											alt="Facebook preview"
											className="w-full h-full object-cover"
											onError={(e) => {
												(e.target as HTMLElement).style.display = "none";
											}}
										/>
									</div>
								)}
								<div className="p-4 bg-[#f0f2f5] dark:bg-[#242526] space-y-1">
									<div className="text-[12px] uppercase text-muted-foreground tracking-wide truncate">
										{domain}
									</div>
									<h4 className="font-semibold text-[16px] leading-[20px] text-[#050505] dark:text-[#e4e6eb] line-clamp-2">
										{form.title || "No Title Provided"}
									</h4>
									<p className="text-[14px] leading-[18px] text-[#65676b] dark:text-[#b0b3b8] line-clamp-2 pt-0.5">
										{form.description ||
											"No description provided. Fill out the description field to see how it renders."}
									</p>
								</div>
							</div>
						</TabsContent>

						{/* Twitter Card Preview */}
						<TabsContent value="twitter" className="pt-6">
							<div className="max-w-[507px] bg-[#ffffff] dark:bg-[#000000] border border-[#cfd9de] dark:border-[#2f3336] rounded-2xl overflow-hidden shadow-sm">
								<div className="bg-[#f7f9f9] dark:bg-[#16181c] p-4 text-xs font-semibold flex items-center gap-2 border-b border-[#cfd9de]/50 dark:border-[#2f3336]/50 text-muted-foreground">
									<span>
										X / Twitter Card Preview (
										{form.twitterCard === "summary"
											? "Summary"
											: "Summary Large Image"}
										)
									</span>
								</div>

								{form.twitterCard === "summary_large_image" ? (
									// Large Image Layout
									<div className="flex flex-col">
										{form.imageUrl && (
											<div className="aspect-[1.91/1] w-full overflow-hidden bg-muted border-b border-[#cfd9de] dark:border-[#2f3336]">
												<img
													src={form.imageUrl}
													alt="Twitter preview"
													className="w-full h-full object-cover"
													onError={(e) => {
														(e.target as HTMLElement).style.display = "none";
													}}
												/>
											</div>
										)}
										<div className="p-3 space-y-0.5 bg-[#ffffff] dark:bg-[#000000]">
											<div className="text-[13px] text-[#536471] dark:text-[#71767b] lowercase truncate">
												{domain}
											</div>
											<h4 className="font-medium text-[15px] text-[#0f1419] dark:text-[#e7e9ea] line-clamp-1">
												{form.title}
											</h4>
											<p className="text-[15px] text-[#536471] dark:text-[#71767b] line-clamp-2">
												{form.description}
											</p>
										</div>
									</div>
								) : (
									// Small Image Layout (Summary)
									<div className="flex p-3 gap-3 bg-[#ffffff] dark:bg-[#000000] items-center">
										{form.imageUrl && (
											<div className="size-[100px] rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/40">
												<img
													src={form.imageUrl}
													alt="Twitter summary preview"
													className="w-full h-full object-cover"
													onError={(e) => {
														(e.target as HTMLElement).style.display = "none";
													}}
												/>
											</div>
										)}
										<div className="flex-1 min-w-0 space-y-0.5">
											<div className="text-[13px] text-[#536471] dark:text-[#71767b] lowercase truncate">
												{domain}
											</div>
											<h4 className="font-medium text-[15px] text-[#0f1419] dark:text-[#e7e9ea] line-clamp-1">
												{form.title}
											</h4>
											<p className="text-[14px] text-[#536471] dark:text-[#71767b] line-clamp-2 leading-tight">
												{form.description}
											</p>
										</div>
									</div>
								)}
							</div>
						</TabsContent>

						{/* LinkedIn Preview Card */}
						<TabsContent value="linkedin" className="pt-6">
							<div className="max-w-[550px] bg-background border border-border rounded-lg overflow-hidden shadow-sm">
								<div className="bg-[#f3f6f8] dark:bg-[#1d2226] p-4 text-xs font-semibold flex items-center gap-2 border-b border-border/40 text-muted-foreground">
									<span>LinkedIn Post Preview</span>
								</div>
								{form.imageUrl && (
									<div className="aspect-[1.91/1] w-full overflow-hidden bg-muted border-b border-border/40">
										<img
											src={form.imageUrl}
											alt="LinkedIn preview"
											className="w-full h-full object-cover"
											onError={(e) => {
												(e.target as HTMLElement).style.display = "none";
											}}
										/>
									</div>
								)}
								<div className="p-3 space-y-1 bg-card">
									<h4 className="font-semibold text-[14px] text-foreground line-clamp-2 leading-tight">
										{form.title}
									</h4>
									<div className="text-[12px] text-muted-foreground truncate">
										{domain}
									</div>
								</div>
							</div>
						</TabsContent>

						{/* Discord Embed Preview Card */}
						<TabsContent value="discord" className="pt-6">
							<div className="max-w-[520px] bg-[#2f3136] rounded-md p-4 flex gap-4 text-left font-sans text-sm select-none border border-black/20 shadow-md">
								{/* Discord Left Accent Bar */}
								<div
									className="w-[4px] bg-[#4f545c] dark:bg-[#1e1f22] rounded-l-md flex-shrink-0"
									style={{ backgroundColor: "#202225" }}
								>
									<div className="h-full w-full bg-[#5865f2] rounded-l-md" />
								</div>

								<div className="flex-1 min-w-0 space-y-2">
									{form.siteName && (
										<div className="text-[12px] text-[#dbdee1] font-normal leading-none">
											{form.siteName}
										</div>
									)}

									<a
										href={form.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[#00b0f4] font-semibold hover:underline block leading-tight text-[16px]"
									>
										{form.title}
									</a>

									<p className="text-[#dbdee1] text-[14px] leading-[18px]">
										{form.description}
									</p>

									{form.imageUrl && (
										<div className="max-w-[400px] max-h-[300px] rounded-md overflow-hidden bg-muted mt-2">
											<img
												src={form.imageUrl}
												alt="Discord embed preview"
												className="max-w-full max-h-full object-contain"
												onError={(e) => {
													(e.target as HTMLElement).style.display = "none";
												}}
											/>
										</div>
									)}
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</ToolPageLayout>
	);
}
