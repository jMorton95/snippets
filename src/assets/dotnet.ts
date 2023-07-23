import { type Item } from "./types";

export const dotNetSnippets: Item = {
  id: "dotnet",
  indent: 0,
  heading: ".NET Snippets",
  gapBottom: 8,
  fontSize: "text-2xl",
  next: [
    {
      id: "entity-framework",
      indent: 4,
      heading: "Entity Framework",
      description: "List of Entity Framework Snippets",
      gapBottom: 4,
      fontSize: "text-xl",
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
            wrapLongLines: true,
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
            wrapLongLines: true,
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
            wrapLongLines: true,
          },
          next: null,
        },
        {
          id: "onmodelcreating-changes-override",
          indent: 8,
          heading: "On Model Creating Custom Entity overrides",
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
          wrapLongLines: true,
        },
        next: null,
        },
      ],
    },
    {
      id: "environment-variables",
      indent: 4,
      heading: "Environment Variables",
      description: "Snippets to display management of Environment Variables, especially Environment Names",
      gapTop: 8,
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
            wrapLongLines: true,
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
            wrapLongLines: true,
          },
          next: null
        }
      ]
    }
  ],
};