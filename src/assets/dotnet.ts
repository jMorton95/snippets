import { type Item } from "./types";

export const dotNetSnippets: Item = {
  id: "dotnet",
  indent: 0,
  heading: ".NET Snippets",
  gapBottom: 8,
  fontSize: "text-4xl",
  next: [
    {
      id: "entity-framework",
      indent: 4,
      heading: "Entity Framework",
      description: "List of Entity Framework Snippets",
      gapBottom: 4,
      fontSize: "text-2xl",
      separator: true,
      next: [
        {
          id: "base-model",
          indent: 8,
          heading: "Base Model",
          description: "Collection of common properties to be used for Base Models",
          snippet: {
            code: `
            //BaseModel.cs
            public class BaseModel
            {
                [Key]
                public int Id { get; set; }
                public DateTime CreatedAt { get; set; }
                public DateTime? UpdatedAt { get; set; }
                public string? CreatedBy { get; set; }
                public string? UpdatedBy { get; set; }
            }
            
            public class MyDatabaseModel : BaseModel
            { 
                //Model Specific Properties
            }
            `,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null,
        },
        {
          id: "data-context",
          indent: 8,
          heading: "Database Context",
          description: "A mapper class for Entity Framework to represent your Database Schema",
          gapBottom: 4,
          snippet: {
            code: `
            //MyDbContext.cs
            public MyDbContext(DbContextOptions options) : base(options) { }

            public DbSet<Person> Person => Set<Person>();
            public DbSet<School> School => Set<School>();
            `,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null,
        },
          {
            id: "save-changes-override",
            indent: 8,
            heading: "Overriding SaveChangesAsync with Base Model",
            description: "We want to define some custom behaviour to wrap the base SaveChangesAsync model to handle modification & creation of default properties such as 'Created At' and 'Updated At' timestamps.",
            snippet: {
            code: `
            //MyDbContext.cs
            public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
            {
                DateTime currentTime = DateTime.UtcNow;

                foreach (var entry in ChangeTracker.Entries())
                {
                    if (entry.Entity is BaseModel entity)
                    {
                        switch (entry.State)
                        {
                            case EntityState.Added:
                                entity.CreatedAt = currentTime;
                                entity.UpdatedAt = null; 
                                break;

                            case EntityState.Modified:
                                entity.UpdatedAt = currentTime;
                                break;
                        }
                    }
                }

                return await base.SaveChangesAsync(cancellationToken);
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null,
        },
        {
          id: "onmodelcreating-changes-override",
          indent: 8,
          heading: "Overriding OnModelCreating for Custom Entity property assignment",
          description: "Certain entites require automatic property assignment at the time of creation. Instead of implementing this whenever you create a record for each Entity, you can just define this behaviour by overriding Entity Framework's OnModelCreating method.",
          snippet: {
          code: `
          //MyDbContext.cs
          protected override void OnModelCreating(ModelBuilder modelBuilder)
          {
              modelBuilder.Entity<Notification>()
                  .Property(n => n.IsRead)
                  .HasDefaultValue(false);
          }
          `,
          language: "csharp",
          showLineNumbers: true,
          startingLineNumber: 0,
          wrapLongLines: false,
        },
          next: null,
        },
      ],
    },
    {
      id: "configuration-extension",
      indent: 4,
      heading: "Configuration Extension",
      description: "Snippets for abstracting Program.cs service registry & reading AppSettings",
      gapTop: 12,
      fontSize: "text-2xl",
      separator: true,
      next: [
        {
          id: "add-service-collection",
          indent: 8,
          heading: "Service Collection Extension",
          description: "A wrapper class to register all of your custom services, designed for easy chaining and modification. Below example uses a ConnectionSettings (below) service that reads Database Connection String settings from AppSettings.x.json",
          snippet: {
            code: `
            //ServiceConfigurationExtension.cs
            public static IServiceCollection AddConfiguration(this IServiceCollection services, IConfiguration configuration)
            {
                return services
                    .AddOptions()
                    .Configure<ConnectionSettings>(configuration.GetSection("ConnectionSettings"))
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null,
        },
        {
          id: "settings-service-extension",
          indent: 8,
          heading: "Register Configuration sections.",
          description: "A wrapper class that reads a section from AppSettings, stores the values in a class and registers it as a service with your application. See above for the code that reads the setting.",
          snippet: {
            code: `
            //appsettings.Environment.json
            "ConnectionSettings": {
              "Host": "localhost",
              "Port": 5432,
              "DatabaseName": "snippets",
              "Username": "snippets",
              "Password": "snippets"
            },

            //ConnectionSettings.cs
            public class ConnectionSettings
            {
                public string Host { get; set; }
                public int Port { get; set; }
                public string DatabaseName { get; set; }
                public string Username { get; set; }
                public string Password { get; set; }

                public string ConnectionString(bool includeErrorDetail = false)
                {
                    return $"Host={Host};Port={Port};Database={DatabaseName};Username={Username};Password={Password};Include Error Detail={includeErrorDetail}";
                }
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null,
        }
      ],
    },
    {
      id: "environment-management",
      indent: 4,
      heading: "Environment Management",
      description: "Snippets to display management of Environment Variables, especially Environment Names",
      gapTop: 12,
      fontSize: "text-2xl",
      separator: true,
      next: [
        {
          id: "publish-profile",
          indent: 8,
          heading: "Publish Profile for EnvironmentName",
          description: "This setting will dynamically assign the Environment Name based on which Profile you publish, very convenient for deploying to multiple IIS environments.",
          snippet: {
            code: `
            //YourPublishProfile.pubxml
            <Project>
              <PropertyGroup>
                <EnvironmentName>Development</EnvironmentName>
              </PropertyGroup>
            </Project>`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null
        },
        {
          id: "program-cs-environment",
          indent: 8,
          heading: "Dynamically Read your AppSettings.environment.json",
          description: "Reads the configuration settings from either your IDE or Publish Profile in deployed environment to read our enivonment specific settings.",
          snippet: {
            code: `
            //program.cs
            string? environmentName = Environment.GetEnvironmentVariable("ENVIRONMENT_NAME");

            if (!string.IsNullOrEmpty(environmentName))
            {
                Console.WriteLine(environmentName);
                builder.Configuration.AddJsonFile($"Backend/appsettings.{environmentName}.json");
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null
        }
      ]
    },
    {
      id: "pagination",
      indent: 4,
      heading: "Pagination in Repository",
      description: "How to set up Pagination through the repository pattern.",
      gapTop: 12,
      fontSize: "text-2xl",
      separator: true,
      next: [
        {
          id: "paged-list-model",
          indent: 8,
          heading: "Paged List Model",
          description: "A standard Class with properties about the overall collection, and a 'Page' of items stored within.",
          snippet: {
            code: `
            //PagedList.cs
            public class PagedList<T> : PageData where T : class
            {
                public List<T> Items { get; set; }
        
                public PagedList()
                {
                    Items = new List<T>();
                }
            }
        
            public class PageData
            {
                public int PageNumber { get; set; }
                public int PageSize { get; set; }
                public int TotalItemCount { get; set; }
        
                public bool IsLastPage
                {
                    get
                    {
                        var lastPageNumber = (int)Math.Ceiling((double)TotalItemCount / PageSize);
                        return lastPageNumber == PageNumber;
                    }
                }
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null
        },
        {
          id: "pages-in-repository",
          indent: 8,
          heading: "Using PagedList in Repository",
          description: "Storing a paged list of the requested Items using the repository pattern.",
          snippet: {
            code: `
            //BaseRepository.cs
            public async Task<PagedList<T>> GetAllPaged(int pageNumber = 1, int pageSize = 15, string navigationPropertyNames = "")
            {
                pageNumber = pageNumber < 1 ? 1 : pageNumber;
                pageSize = pageSize > 15 ? 15 : pageSize;
                var query = _databaseContext.Set<T>().AsQueryable();
                query = HandleNavigationProperties(query, navigationPropertyNames);

                var pagedResults = new PagedList<T>()
                {
                    Items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(),
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalItemCount = query.Count()
                };

                return pagedResults;
            }`,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null
        }
      ]
    },
    {
      id: "repository-extension",
      indent: 4,
      heading: "Repository Pattern Snippets",
      description: "Some common snippets for extending the Repository Pattern",
      gapTop: 12,
      fontSize: "text-2xl",
      separator: true,
      next: [
        {
          id: "custom-where",
          indent: 8,
          heading: "Custom Where filter",
          description: "We can extend our low level Repository in implementing classes by passing a Lamba function down with a DbSet built with Navigation Properties.",
          snippet: {
            code: `
            //BaseRepository.cs
            public PagedList<T> GetPagedWhere(IQueryable<T> query, Func<T, bool> whereClause, int pageNumber = 1, int pageSize = 15)
            {
                pageNumber = pageNumber < 1 ? 1 : pageNumber;
                pageSize = pageSize > 15 ? 15 : pageSize;

                //Key Detail
                var result = query.Where(whereClause);

                var pagedResults = new PagedList<T>()
                {
                    Items = result.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(),
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalItemCount = result.Count()
                };

                return pagedResults;
            }
            
            //InheritingRepository.cs
            public class InheritingRepository : BaseRepository<ItemData>, IInheritingRepository
            {
                public InheritingRepository(MyDbContext context) : base(context) { }
        
                public PagedList<ItemData> GetItemsWhere(Func<T, bool> whereClause)
                {
                    var query = _databaseContext.Set<ItemData>().AsQueryable();
        
                    return GetPagedWhere(query, whereClause);
                }
            }

            //ExampleUsage
            var pagedItemsWhere(x => x.CreatedDate <= DateTime.UtcNow.AddDays(-1))
            `,
            language: "csharp",
            showLineNumbers: true,
            startingLineNumber: 0,
            wrapLongLines: false,
          },
          next: null
        },
      ]
    },
  ],
};