import { type Item } from "./types";

export const dotNetSnippets: Item = {
  id: "dotnet",
  indent: 0,
  heading: ".NET Snippets",
  next: [
    {
      id: "entity-framework",
      indent: 4,
      heading: "Entity Framework",
      description: "List of Entity Framework Snippets",
      next: [
        {
          id: "data-context",
          indent: 8,
          heading: "Data Context",
          description: "This is what a data context looks like",
          snippet: {
            code: `
            //MyDbContext.cs
            public MyDbContext(DbContextOptions options) : base(options) { }
            public DbSet<Person> Person => Set<Person>();
            public DbSet<School> School => Set<School>();`,
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