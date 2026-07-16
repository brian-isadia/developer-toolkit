import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
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

export const Route = createFileRoute("/preview/json-ld-builder")({
	component: JsonLdBuilder,
	head: () => ({
		meta: [
			{ title: "JSON-LD Builder | WebToolkit" },
			{
				name: "description",
				content: "Build and validate structured data for schema.org",
			},
		],
	}),
});

interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

interface BreadcrumbItem {
	id: string;
	name: string;
	url: string;
}

function JsonLdBuilder() {
	const [schemaType, setSchemaType] = useState<
		| "article"
		| "product"
		| "faq"
		| "organization"
		| "local_business"
		| "breadcrumb"
	>("article");

	// Article state
	const [article, setArticle] = useState({
		headline: "How to Build a Web App in 2026",
		authorName: "Jane Doe",
		datePublished: "2026-07-01",
		dateModified: "2026-07-16",
		imageUrl: "https://example.com/image.jpg",
		publisherName: "WebToolkit",
		description:
			"A comprehensive guide to modern web development technologies and practices.",
	});

	// Product state
	const [product, setProduct] = useState({
		name: "Premium Developer Toolkit Subscription",
		description:
			"Access all premium developer utility tools with high-speed performance and zero limits.",
		imageUrl: "https://example.com/product.jpg",
		brand: "WebToolkit",
		price: "29.00",
		currency: "USD",
		availability: "https://schema.org/InStock",
	});

	// FAQ state
	const [faqItems, setFaqItems] = useState<FaqItem[]>([
		{
			id: "faq-1",
			question: "What is structured data?",
			answer:
				"Structured data is a standardized format for providing information about a page and classifying the page content.",
		},
		{
			id: "faq-2",
			question: "How does JSON-LD work?",
			answer:
				"JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding Linked Data using JSON.",
		},
	]);

	// Organization state
	const [organization, setOrganization] = useState({
		name: "WebToolkit Org",
		url: "https://webtoolkit.dev",
		logoUrl: "https://webtoolkit.dev/logo.png",
		description:
			"Providing a complete suite of browser-based helper tools for developers.",
	});

	// Local Business state
	const [localBusiness, setLocalBusiness] = useState({
		name: "DevCafe & Coworking",
		streetAddress: "123 Code Street",
		addressLocality: "San Francisco",
		addressRegion: "CA",
		postalCode: "94107",
		addressCountry: "US",
		telephone: "+1-555-0199",
		openingHours: "Mo-Fr 08:00-20:00",
	});

	// Breadcrumb state
	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
		{ id: "bc-1", name: "Home", url: "https://webtoolkit.dev" },
		{ id: "bc-2", name: "Tools", url: "https://webtoolkit.dev/tools" },
		{
			id: "bc-3",
			name: "JSON-LD Builder",
			url: "https://webtoolkit.dev/preview/json-ld-builder",
		},
	]);

	// Updaters
	const updateArticle = (field: keyof typeof article, value: string) => {
		setArticle((prev) => ({ ...prev, [field]: value }));
	};

	const updateProduct = (field: keyof typeof product, value: string) => {
		setProduct((prev) => ({ ...prev, [field]: value }));
	};

	const updateOrganization = (
		field: keyof typeof organization,
		value: string,
	) => {
		setOrganization((prev) => ({ ...prev, [field]: value }));
	};

	const updateLocalBusiness = (
		field: keyof typeof localBusiness,
		value: string,
	) => {
		setLocalBusiness((prev) => ({ ...prev, [field]: value }));
	};

	// FAQ Handlers
	const addFaqItem = () => {
		setFaqItems((prev) => [
			...prev,
			{ id: `faq-${Date.now()}`, question: "", answer: "" },
		]);
	};

	const removeFaqItem = (id: string) => {
		setFaqItems((prev) => prev.filter((item) => item.id !== id));
	};

	const updateFaqItem = (
		id: string,
		field: "question" | "answer",
		value: string,
	) => {
		setFaqItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
		);
	};

	// Breadcrumb Handlers
	const addBreadcrumb = () => {
		setBreadcrumbs((prev) => [
			...prev,
			{ id: `bc-${Date.now()}`, name: "", url: "" },
		]);
	};

	const removeBreadcrumb = (id: string) => {
		setBreadcrumbs((prev) => prev.filter((item) => item.id !== id));
	};

	const updateBreadcrumb = (
		id: string,
		field: "name" | "url",
		value: string,
	) => {
		setBreadcrumbs((prev) =>
			prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
		);
	};

	const generateJsonLd = () => {
		const base = {
			"@context": "https://schema.org",
		};

		let specific: Record<string, unknown> = {};

		if (schemaType === "article") {
			specific = {
				"@type": "Article",
				headline: article.headline || undefined,
				image: article.imageUrl ? [article.imageUrl] : undefined,
				datePublished: article.datePublished || undefined,
				dateModified: article.dateModified || undefined,
				author: article.authorName
					? {
							"@type": "Person",
							name: article.authorName,
						}
					: undefined,
				publisher: article.publisherName
					? {
							"@type": "Organization",
							name: article.publisherName,
						}
					: undefined,
				description: article.description || undefined,
			};
		} else if (schemaType === "product") {
			specific = {
				"@type": "Product",
				name: product.name || undefined,
				image: product.imageUrl ? [product.imageUrl] : undefined,
				description: product.description || undefined,
				brand: product.brand
					? {
							"@type": "Brand",
							name: product.brand,
						}
					: undefined,
				offers: {
					"@type": "Offer",
					price: product.price || undefined,
					priceCurrency: product.currency || undefined,
					availability: product.availability || undefined,
				},
			};
		} else if (schemaType === "faq") {
			specific = {
				"@type": "FAQPage",
				mainEntity: faqItems
					.filter((item) => item.question.trim() || item.answer.trim())
					.map((item) => ({
						"@type": "Question",
						name: item.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: item.answer,
						},
					})),
			};
		} else if (schemaType === "organization") {
			specific = {
				"@type": "Organization",
				name: organization.name || undefined,
				url: organization.url || undefined,
				logo: organization.logoUrl || undefined,
				description: organization.description || undefined,
			};
		} else if (schemaType === "local_business") {
			specific = {
				"@type": "LocalBusiness",
				name: localBusiness.name || undefined,
				telephone: localBusiness.telephone || undefined,
				address: {
					"@type": "PostalAddress",
					streetAddress: localBusiness.streetAddress || undefined,
					addressLocality: localBusiness.addressLocality || undefined,
					addressRegion: localBusiness.addressRegion || undefined,
					postalCode: localBusiness.postalCode || undefined,
					addressCountry: localBusiness.addressCountry || undefined,
				},
				openingHours: localBusiness.openingHours || undefined,
			};
		} else if (schemaType === "breadcrumb") {
			specific = {
				"@type": "BreadcrumbList",
				itemListElement: breadcrumbs
					.filter((item) => item.name.trim() || item.url.trim())
					.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: item.name,
						item: item.url || undefined,
					})),
			};
		}

		const payload = { ...base, ...specific };
		return `<script type="application/ld+json">\n${JSON.stringify(payload, null, 2)}\n</script>`;
	};

	const codeJsonLd = generateJsonLd();

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[450px_1fr] gap-8">
				{/* Editor Sidebar */}
				<div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 pb-6 border-r border-border/50">
					<div className="space-y-2">
						<Label htmlFor="schema-select" className="text-sm font-semibold">
							Schema.org Type
						</Label>
						<Select
							value={schemaType}
							onValueChange={(val) =>
								setSchemaType(
									val as
										| "article"
										| "product"
										| "faq"
										| "organization"
										| "local_business"
										| "breadcrumb",
								)
							}
						>
							<SelectTrigger id="schema-select" className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="article">Article</SelectItem>
								<SelectItem value="product">Product</SelectItem>
								<SelectItem value="faq">FAQ Page</SelectItem>
								<SelectItem value="organization">Organization</SelectItem>
								<SelectItem value="local_business">Local Business</SelectItem>
								<SelectItem value="breadcrumb">Breadcrumb List</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-4 pt-4 border-t border-border/50">
						{/* Article form fields */}
						{schemaType === "article" && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="art-headline">Headline</Label>
									<Input
										id="art-headline"
										value={article.headline}
										onChange={(e) => updateArticle("headline", e.target.value)}
										placeholder="e.g. Article Headline"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="art-author">Author Name</Label>
									<Input
										id="art-author"
										value={article.authorName}
										onChange={(e) =>
											updateArticle("authorName", e.target.value)
										}
										placeholder="e.g. Author Name"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="art-published">Published Date</Label>
										<Input
											id="art-published"
											type="date"
											value={article.datePublished}
											onChange={(e) =>
												updateArticle("datePublished", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="art-modified">Modified Date</Label>
										<Input
											id="art-modified"
											type="date"
											value={article.dateModified}
											onChange={(e) =>
												updateArticle("dateModified", e.target.value)
											}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="art-image">Image URL</Label>
									<Input
										id="art-image"
										value={article.imageUrl}
										onChange={(e) => updateArticle("imageUrl", e.target.value)}
										placeholder="e.g. https://example.com/cover.jpg"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="art-publisher">Publisher Name</Label>
									<Input
										id="art-publisher"
										value={article.publisherName}
										onChange={(e) =>
											updateArticle("publisherName", e.target.value)
										}
										placeholder="e.g. Publisher Name"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="art-desc">Description</Label>
									<Textarea
										id="art-desc"
										value={article.description}
										onChange={(e) =>
											updateArticle("description", e.target.value)
										}
										placeholder="Short summary of the article..."
										rows={4}
									/>
								</div>
							</div>
						)}

						{/* Product form fields */}
						{schemaType === "product" && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="prod-name">Product Name</Label>
									<Input
										id="prod-name"
										value={product.name}
										onChange={(e) => updateProduct("name", e.target.value)}
										placeholder="e.g. Widget Pro"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="prod-brand">Brand</Label>
									<Input
										id="prod-brand"
										value={product.brand}
										onChange={(e) => updateProduct("brand", e.target.value)}
										placeholder="e.g. Acme Corp"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="prod-price">Price</Label>
										<Input
											id="prod-price"
											type="number"
											step="0.01"
											value={product.price}
											onChange={(e) => updateProduct("price", e.target.value)}
											placeholder="e.g. 29.99"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="prod-currency">Currency (ISO)</Label>
										<Input
											id="prod-currency"
											value={product.currency}
											onChange={(e) =>
												updateProduct("currency", e.target.value)
											}
											placeholder="e.g. USD, EUR"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="prod-image">Image URL</Label>
									<Input
										id="prod-image"
										value={product.imageUrl}
										onChange={(e) => updateProduct("imageUrl", e.target.value)}
										placeholder="e.g. https://example.com/product.jpg"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="prod-availability">Availability</Label>
									<Select
										value={product.availability}
										onValueChange={(val) => updateProduct("availability", val)}
									>
										<SelectTrigger id="prod-availability">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="https://schema.org/InStock">
												In Stock
											</SelectItem>
											<SelectItem value="https://schema.org/OutOfStock">
												Out of Stock
											</SelectItem>
											<SelectItem value="https://schema.org/PreOrder">
												Pre Order
											</SelectItem>
											<SelectItem value="https://schema.org/Discontinued">
												Discontinued
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="prod-desc">Description</Label>
									<Textarea
										id="prod-desc"
										value={product.description}
										onChange={(e) =>
											updateProduct("description", e.target.value)
										}
										placeholder="Product details..."
										rows={4}
									/>
								</div>
							</div>
						)}

						{/* FAQ form fields */}
						{schemaType === "faq" && (
							<div className="space-y-6">
								<div className="flex items-center justify-between border-b border-border/40 pb-2">
									<h4 className="font-semibold text-sm">
										FAQ Question & Answers
									</h4>
									<Button size="sm" variant="outline" onClick={addFaqItem}>
										<Plus className="size-4 mr-1.5" /> Add QA
									</Button>
								</div>

								{faqItems.map((item, index) => (
									<div
										key={item.id}
										className="relative p-4 bg-muted/20 border border-border/50 rounded-xl space-y-3"
									>
										<div className="flex items-center justify-between">
											<span className="text-xs font-semibold text-muted-foreground">
												Question #{index + 1}
											</span>
											{faqItems.length > 1 && (
												<Button
													variant="ghost"
													size="icon"
													className="size-7 text-destructive hover:text-destructive hover:bg-destructive/10"
													onClick={() => removeFaqItem(item.id)}
												>
													<Trash2 className="size-4" />
												</Button>
											)}
										</div>
										<div className="space-y-2">
											<Input
												value={item.question}
												onChange={(e) =>
													updateFaqItem(item.id, "question", e.target.value)
												}
												placeholder="e.g. What is the return policy?"
											/>
											<Textarea
												value={item.answer}
												onChange={(e) =>
													updateFaqItem(item.id, "answer", e.target.value)
												}
												placeholder="e.g. We offer a 30-day money-back guarantee."
												rows={2}
											/>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Organization form fields */}
						{schemaType === "organization" && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="org-name">Organization Name</Label>
									<Input
										id="org-name"
										value={organization.name}
										onChange={(e) => updateOrganization("name", e.target.value)}
										placeholder="e.g. Acme Corp"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-url">Website URL</Label>
									<Input
										id="org-url"
										value={organization.url}
										onChange={(e) => updateOrganization("url", e.target.value)}
										placeholder="e.g. https://example.com"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-logo">Logo URL</Label>
									<Input
										id="org-logo"
										value={organization.logoUrl}
										onChange={(e) =>
											updateOrganization("logoUrl", e.target.value)
										}
										placeholder="e.g. https://example.com/logo.png"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-desc">Description</Label>
									<Textarea
										id="org-desc"
										value={organization.description}
										onChange={(e) =>
											updateOrganization("description", e.target.value)
										}
										placeholder="About the organization..."
										rows={4}
									/>
								</div>
							</div>
						)}

						{/* Local Business form fields */}
						{schemaType === "local_business" && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="biz-name">Business Name</Label>
									<Input
										id="biz-name"
										value={localBusiness.name}
										onChange={(e) =>
											updateLocalBusiness("name", e.target.value)
										}
										placeholder="e.g. Joe's Coffee"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="biz-tel">Telephone</Label>
									<Input
										id="biz-tel"
										value={localBusiness.telephone}
										onChange={(e) =>
											updateLocalBusiness("telephone", e.target.value)
										}
										placeholder="e.g. +1-555-0199"
									/>
								</div>
								<div className="space-y-2 font-semibold text-xs text-muted-foreground uppercase tracking-wider pt-2">
									Address
								</div>
								<div className="space-y-2">
									<Label htmlFor="biz-street">Street Address</Label>
									<Input
										id="biz-street"
										value={localBusiness.streetAddress}
										onChange={(e) =>
											updateLocalBusiness("streetAddress", e.target.value)
										}
										placeholder="e.g. 100 Main St"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="biz-city">City</Label>
										<Input
											id="biz-city"
											value={localBusiness.addressLocality}
											onChange={(e) =>
												updateLocalBusiness("addressLocality", e.target.value)
											}
											placeholder="e.g. New York"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="biz-state">State / Region</Label>
										<Input
											id="biz-state"
											value={localBusiness.addressRegion}
											onChange={(e) =>
												updateLocalBusiness("addressRegion", e.target.value)
											}
											placeholder="e.g. NY"
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="biz-zip">Postal / Zip Code</Label>
										<Input
											id="biz-zip"
											value={localBusiness.postalCode}
											onChange={(e) =>
												updateLocalBusiness("postalCode", e.target.value)
											}
											placeholder="e.g. 10001"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="biz-country">Country</Label>
										<Input
											id="biz-country"
											value={localBusiness.addressCountry}
											onChange={(e) =>
												updateLocalBusiness("addressCountry", e.target.value)
											}
											placeholder="e.g. US"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="biz-hours">Opening Hours Directive</Label>
									<Input
										id="biz-hours"
										value={localBusiness.openingHours}
										onChange={(e) =>
											updateLocalBusiness("openingHours", e.target.value)
										}
										placeholder="e.g. Mo-Fr 09:00-17:00"
									/>
								</div>
							</div>
						)}

						{/* Breadcrumb form fields */}
						{schemaType === "breadcrumb" && (
							<div className="space-y-6">
								<div className="flex items-center justify-between border-b border-border/40 pb-2">
									<h4 className="font-semibold text-sm">Breadcrumbs</h4>
									<Button size="sm" variant="outline" onClick={addBreadcrumb}>
										<Plus className="size-4 mr-1.5" /> Add Item
									</Button>
								</div>

								<div className="space-y-3">
									{breadcrumbs.map((item, index) => (
										<div
											key={item.id}
											className="flex flex-col gap-2 p-3 bg-muted/20 border border-border/50 rounded-xl"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-semibold text-muted-foreground">
													Level #{index + 1}
												</span>
												{breadcrumbs.length > 1 && (
													<Button
														variant="ghost"
														size="icon"
														className="size-7 text-destructive hover:text-destructive hover:bg-destructive/10"
														onClick={() => removeBreadcrumb(item.id)}
													>
														<Trash2 className="size-4" />
													</Button>
												)}
											</div>
											<div className="grid grid-cols-2 gap-2">
												<Input
													value={item.name}
													onChange={(e) =>
														updateBreadcrumb(item.id, "name", e.target.value)
													}
													placeholder="Name (e.g. Books)"
												/>
												<Input
													value={item.url}
													onChange={(e) =>
														updateBreadcrumb(item.id, "url", e.target.value)
													}
													placeholder="URL (e.g. https://...)"
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Output Panel */}
				<div className="flex flex-col space-y-4">
					<h3 className="font-semibold text-lg">Structured Data JSON-LD</h3>
					<div className="flex-1">
						<CodeOutput
							code={codeJsonLd}
							language="json"
							label="JSON-LD script block"
						/>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
