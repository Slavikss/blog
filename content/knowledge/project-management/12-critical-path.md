---
title: "Creating a critical path"
description: "Раздел из Project Management Cheatsheet: Creating a critical path"
tags:
  - knowledge
  - project-management
  - cheatsheet
draft: false
aliases:
  - /project-management-study/12-critical-path
---

# Creating a critical path

## **How to create a critical path**

### **Step 1: Capture all tasks**

| **Task**                                             |
| ---------------------------------------------------- |
| A) Excavation                                        |
| B) Foundation                                        |
| C) Framing                                           |
| D) Roof                                              |
| E) Plumbing                                          |
| F) Heating, ventilation, and air conditioning (HVAC) |
| G) Electrical                                        |
| H) Insulation                                        |
| I) Drywall + Paint                                   |
| J) Flooring                                          |

### **Step 2: Set dependencies**

| **Task**           | **Dependency**                      |
| ------------------ | ----------------------------------- |
| A) Excavation      |                                     |
| B) Foundation      | A) Excavation                       |
| C) Framing         | B) Foundation                       |
| D) Roof            | C) Framing                          |
| E) Plumbing        | C) Framing                          |
| F) HVAC            | C) Framing                          |
| G) Electrical      | C) Framing                          |
| H) Insulation      | E) Plumbing, F) HVAC, G) Electrical |
| I) Drywall + Paint | H) Insulation                       |
| J) Flooring        | I) Drywall + Paint                  |

### **Step 3: Create a network diagram**

![[assets/Pasted image 20250605220523.png]]

### **Step 4: Make time estimates**

| **Task**           | **Duration** | **Dependency**                      |
| ------------------ | ------------ | ----------------------------------- |
| A) Excavation      | 1 Day        |                                     |
| B) Foundation      | 3 Days       | A) Excavation                       |
| C) Framing         | 15 Days      | B) Foundation                       |
| D) Roof            | 3 Days       | C) Framing                          |
| E) Plumbing        | 4 Days       | C) Framing                          |
| F) HVAC            | 3 Days       | C) Framing                          |
| G) Electrical      | 3 Days       | C) Framing                          |
| H) Insulation      | 2 Days       | E) Plumbing, F) HVAC, G) Electrical |
| I) Drywall + Paint | 15 Days      | H) Insulation                       |
| J) Flooring        | 7 Days       | I) Drywall + Paint                  |

![[assets/Pasted image 20250605220531.png]]

### **Step 5: Find the critical path**

- [How to Use the Critical Path Method for Complete Beginners](https://www.workamajig.com/blog/critical-path-method)
- [Critical Path Method: A Project Management Essential](https://www.wrike.com/blog/critical-path-is-easy-as-123/)

## **Project budgeting best practices**

## **Categorize different types of costs**

### **Direct costs**

### **Indirect costs**

## **Develop a baseline budget**

## **Perform a reserve analysis**

---

## Навигация

- Prev: [[knowledge/project-management/11-planning-fallacy|Overcoming the planning fallacy]]
- [[project-management-study|Наверх: Project Management Cheatsheet]]
- Next: [[knowledge/project-management/13-budget-templates|Helpful budget templates]]
