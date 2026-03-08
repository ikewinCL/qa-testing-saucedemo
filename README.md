# Proyecto QA Funcional + Automatización – SauceDemo

Proyecto de portafolio orientado a postulación como **QA Funcional Junior**.  
El objetivo es demostrar criterio de testing, documentación clara, trazabilidad y una base real de automatización.

## 1. Sistema bajo prueba
- **Aplicación:** SauceDemo / Swag Labs
- **URL:** https://www.saucedemo.com/
- **Tipo:** e-commerce web demo

## 2. Qué incluye este repositorio
- Documento QA profesional en Word
- Casos de prueba en Excel con trazabilidad, datos de prueba y plantilla de defectos
- Base de automatización con **Playwright**
- Estructura lista para crecer en GitHub

## 3. Cobertura funcional
### Módulos cubiertos
- Login
- Inventario
- Carrito
- Checkout
- Menú lateral (logout / reset)

### Enfoque de pruebas
- Smoke
- Funcionales positivas
- Funcionales negativas
- Regresión
- Exploratoria ligera

## 4. Criterio ISTQB aplicado
En el diseño de casos se aplican técnicas típicas de ISTQB Foundation:
- **Partición de equivalencia**
- **Tabla de decisión**
- **Transición de estados**
- **Validación por valor esperado**
- **Error guessing**

## 5. Archivos principales
- `docs/Documento_QA_SauceDemo_Portafolio.docx`
- `docs/Casos_Prueba_SauceDemo_Portafolio.xlsx`
- `docs/Plantilla_Bug_Report.md`
- `automation/`

## 6. Automatización
La automatización usa:
- **Playwright Test**
- **JavaScript**
- **Page Object Model**

### Casos automatizados base
- Login válido
- Usuario bloqueado
- Validaciones obligatorias del login
- Ordenamiento por precio
- Agregar y eliminar productos del carrito
- Checkout exitoso
- Reset App State
- Logout

## 7. Estructura del proyecto
```text
Proyecto_QA_SauceDemo_NTTDATA/
├── README.md
├── docs/
│   ├── Documento_QA_SauceDemo_Portafolio.docx
│   ├── Casos_Prueba_SauceDemo_Portafolio.xlsx
│   └── Plantilla_Bug_Report.md
└── automation/
    ├── package.json
    ├── playwright.config.js
    ├── pages/
    ├── tests/
    └── fixtures/
```

## 8. Cómo ejecutar la automatización
Desde la carpeta `automation/`:

```bash
npm install
npx playwright install
npx playwright test
```

### Reporte HTML
```bash
npx playwright show-report
```

## 9. Cómo vender este proyecto en una entrevista
Puedes explicar:
1. **Qué módulos priorizaste y por qué**
2. **Qué criterios usaste para seleccionar pruebas manuales vs automatizadas**
3. **Cómo aplicaste ISTQB**
4. **Cómo organizaste los casos por riesgo y trazabilidad**
5. **Qué mejoras futuras harías**
   - CI con GitHub Actions
   - pruebas cross-browser
   - evidencias automáticas
   - métricas de ejecución
   - integración con reporte de defectos

## 10. Valor profesional del proyecto
Este repositorio busca reflejar competencias útiles para un rol como:
- QA Funcional Junior
- QA Manual con base de automatización
- QA Analyst / QA Engineer Junior

## 11. Mejoras futuras sugeridas
- Agregar evidencias reales de ejecución (capturas o videos)
- Crear issues de ejemplo con defectos reproducibles
- Incorporar GitHub Actions para correr Playwright en CI
- Separar smoke y regression por tags
- Añadir checklist exploratorio para usuarios especiales

---
**Autor:** Proyecto de portafolio personal  
**Fecha:** 08/03/2026
