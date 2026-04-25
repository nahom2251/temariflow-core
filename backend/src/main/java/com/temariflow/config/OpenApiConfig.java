package com.temariflow.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
  @Bean OpenAPI openAPI() {
    return new OpenAPI().info(new Info().title("TemariFlow ERP API").version("1.0.0")
        .description("TemariFlow ERP — production API. Includes auth, multi-tenant ERP modules, promotion rules, report cards, files, analytics, and platform admin."))
      .schemaRequirement("bearerAuth", new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))
      .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
  }
}
