# API接口设计

## 认证相关接口

### POST /api/auth/login
用户登录

请求参数：
```json
{
  "email": "string",
  "password": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "image": "string"
    },
    "token": "string"
  }
}
```

### POST /api/auth/register
用户注册

请求参数：
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "image": "string"
    },
    "token": "string"
  }
}
```

### GET /api/auth/session
获取当前用户会话信息

响应：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "image": "string"
    }
  }
}
```

## 灵感管理接口

### GET /api/inspirations
获取灵感列表

查询参数：
- page: 页码 (默认: 1)
- limit: 每页数量 (默认: 10, 最大: 100)
- category: 分类ID
- tag: 标签ID
- search: 搜索关键词
- sortBy: 排序字段 (createdAt, updatedAt)
- sortOrder: 排序顺序 (asc, desc)

响应：
```json
{
  "success": true,
  "data": {
    "inspirations": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "url": "string",
        "imageUrl": "string",
        "category": {
          "id": "string",
          "name": "string"
        },
        "tags": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### GET /api/inspirations/:id
获取单个灵感详情

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "url": "string",
    "imageUrl": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "tags": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "collections": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "prompt": {
      "id": "string",
      "title": "string"
    },
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### POST /api/inspirations
创建新灵感

请求参数：
```json
{
  "title": "string",
  "content": "string",
  "url": "string",
  "imageUrl": "string",
  "categoryId": "string",
  "tagIds": ["string"],
  "collectionIds": ["string"]
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "url": "string",
    "imageUrl": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "tags": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "collections": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### PUT /api/inspirations/:id
更新灵感

请求参数：
```json
{
  "title": "string",
  "content": "string",
  "url": "string",
  "imageUrl": "string",
  "categoryId": "string",
  "tagIds": ["string"],
  "collectionIds": ["string"]
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "url": "string",
    "imageUrl": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "tags": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "collections": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### DELETE /api/inspirations/:id
删除灵感

响应：
```json
{
  "success": true,
  "message": "Inspiration deleted successfully"
}
```

## 分类管理接口

### GET /api/categories
获取所有分类

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "inspirationCount": 0,
      "createdAt": "datetime"
    }
  ]
}
```

### POST /api/categories
创建新分类

请求参数：
```json
{
  "name": "string",
  "description": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### PUT /api/categories/:id
更新分类

请求参数：
```json
{
  "name": "string",
  "description": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### DELETE /api/categories/:id
删除分类

响应：
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

## 标签管理接口

### GET /api/tags
获取所有标签

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "inspirationCount": 0,
      "createdAt": "datetime"
    }
  ]
}
```

### POST /api/tags
创建新标签

请求参数：
```json
{
  "name": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### DELETE /api/tags/:id
删除标签

响应：
```json
{
  "success": true,
  "message": "Tag deleted successfully"
}
```

## 收藏集管理接口

### GET /api/collections
获取用户的收藏集

查询参数：
- includePrivate: 是否包含私有收藏集 (默认: false)

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "isPublic": true,
      "inspirationCount": 0,
      "createdAt": "datetime"
    }
  ]
}
```

### POST /api/collections
创建新收藏集

请求参数：
```json
{
  "name": "string",
  "description": "string",
  "isPublic": true
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "isPublic": true,
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### GET /api/collections/:id
获取收藏集详情

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "isPublic": true,
    "inspirations": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "url": "string",
        "imageUrl": "string",
        "category": {
          "id": "string",
          "name": "string"
        },
        "tags": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "addedAt": "datetime"
      }
    ],
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### PUT /api/collections/:id
更新收藏集

请求参数：
```json
{
  "name": "string",
  "description": "string",
  "isPublic": true
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "isPublic": true,
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### DELETE /api/collections/:id
删除收藏集

响应：
```json
{
  "success": true,
  "message": "Collection deleted successfully"
}
```

### POST /api/collections/:id/inspirations
向收藏集添加灵感

请求参数：
```json
{
  "inspirationId": "string"
}
```

响应：
```json
{
  "success": true,
  "message": "Inspiration added to collection successfully"
}
```

### DELETE /api/collections/:id/inspirations/:inspirationId
从收藏集移除灵感

响应：
```json
{
  "success": true,
  "message": "Inspiration removed from collection successfully"
}
```

## 提示词管理接口

### GET /api/prompts
获取用户的提示词

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "usageCount": 0,
      "createdAt": "datetime"
    }
  ]
}
```

### POST /api/prompts
创建新提示词

请求参数：
```json
{
  "title": "string",
  "content": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### PUT /api/prompts/:id
更新提示词

请求参数：
```json
{
  "title": "string",
  "content": "string"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "userId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### DELETE /api/prompts/:id
删除提示词

响应：
```json
{
  "success": true,
  "message": "Prompt deleted successfully"
}
```

## 内容采集接口

### POST /api/collector/scrape
采集网页内容

请求参数：
```json
{
  "url": "string",
  "categoryId": "string",
  "tagIds": ["string"]
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "url": "string",
    "imageUrl": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "tags": [
      {
        "id": "string",
        "name": "string"
      }
    ],
    "createdAt": "datetime"
  }
}
```

### POST /api/collector/auto-categorize
自动分类内容

请求参数：
```json
{
  "content": "string",
  "existingCategories": ["string"]
}
```

响应：
```json
{
  "success": true,
  "data": {
    "categoryId": "string",
    "confidence": 0.95
  }
}
```

## Notion集成接口

### GET /api/notion/databases
获取用户可用的Notion数据库

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "properties": [
        {
          "name": "string",
          "type": "string"
        }
      ]
    }
  ]
}
```

### POST /api/notion/sync
同步灵感到Notion

请求参数：
```json
{
  "databaseId": "string",
  "inspirationIds": ["string"]
}
```

响应：
```json
{
  "success": true,
  "data": {
    "syncedCount": 5,
    "failedCount": 0
  }
}
```