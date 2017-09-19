# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
	prefix.browsers = "last 2 versions"
end
activate :directory_indexes

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
	# Grab pages in a section and sort them by an 'order' variable
	def sort_pages(section)
		sitemap.resources.select do |page|
			page.data.section == section
		end.sort_by { |page| page.data.order }
	end
	# Get previous or next page data using the 'order' variable
	def adjacent_page(data, increment)
		if increment == 'previous'
			order = (current_page.data.order - 1)
		elsif increment == 'next'
			order = (current_page.data.order + 1)
		end
		current_page.siblings.select do |page|
			if page.data.order == order
				if data == 'url'
					@return = page.url
				elsif data == 'headline'
					@return = page.data.headline
				end
			end
		end
		@return
	end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# Ignore files
# Archived pages to be 'deleted' from build
ignore 'portfolio/rosevine-winery.html'
ignore 'portfolio/tropical-floors-and-doors.html'
ignore 'portfolio/tags-pet-care-club.html'

# Gulp external pipeline
activate :external_pipeline,
name: :gulp,
command: './node_modules/gulp/bin/gulp.js default',
source: ".tmp/dist"

# Run more Gulp tasks after build
after_build do
	system './node_modules/gulp/bin/gulp.js inlinesource'
	system './node_modules/gulp/bin/gulp.js removeattributes'
end

configure :build do
	activate :minify_html
	config[:host] = "https://mark-clifton.com/"
	config[:description] = "An art director and full-stack designer residing in Atlanta, GA, with 20+ years of experience in interactive, print, and branding."
	config[:name] = "Mark Clifton"
	config[:tagline] = "Art director & full-stack designer"
	config[:email] = "mark@mark-clifton.com"
	config[:emaillink] = "mailto:" + config[:email]
	config[:city] = "Atlanta"
	config[:state] = "GA"
	config[:country] = "USA"
	config[:linkedin] = "https://www.linkedin.com/in/mark-clifton/"
	config[:github] = "https://github.com/mark-clifton"
	config[:codepen] = "http://codepen.io/phasespace/"
end
