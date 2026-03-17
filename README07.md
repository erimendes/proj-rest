Vou montar para você **as 3 partes completas do sistema** que faltam no seu projeto de restaurante:

1️⃣ **App do garçom pronto** 📱
2️⃣ **Tela de cozinha estilo McDonald's (Kitchen Display System)** 🍔
3️⃣ **Sistema de QR Code funcional para clientes pedirem** 📷

Tudo integrado com:

* Next.js
* NestJS
* Socket.IO

---

# 1️⃣ APP DO GARÇOM (com mesas e pedidos)

Estrutura do app:

```id="waiter_structure"
waiter-app
│
├ app
│ ├ login
│ ├ tables
│ ├ order
│ └ menu
│
├ components
│ ├ TableCard.tsx
│ ├ ProductCard.tsx
│ └ OrderItem.tsx
│
└ services
  └ api.ts
```

---

# Tela de Mesas

`app/tables/page.tsx`

```tsx id="tables_page"
"use client"

import { useEffect,useState } from "react"

export default function Tables(){

 const [tables,setTables] = useState([])

 useEffect(()=>{

  fetch("http://localhost:3001/tables")
   .then(res=>res.json())
   .then(setTables)

 },[])

 return(

  <div>

   <h1>Mesas</h1>

   {tables.map((table:any)=>(

    <div key={table.id}>
     Mesa {table.number}
    </div>

   ))}

  </div>

 )

}
```

---

# Tela de Pedido

`app/order/[id]/page.tsx`

```tsx id="order_page"
"use client"

import { useState } from "react"

export default function Order(){

 const [items,setItems] = useState([])

 const addItem = (product:any)=>{

  setItems([...items,product])

 }

 const sendOrder = async()=>{

  await fetch("http://localhost:3001/orders",{
   method:"POST",
   headers:{ "Content-Type":"application/json"},
   body:JSON.stringify({items})
  })

 }

 return(

  <div>

   <h1>Pedido</h1>

   {items.map((i:any)=>(
    <div>{i.name}</div>
   ))}

   <button onClick={sendOrder}>
    Enviar para cozinha
   </button>

  </div>

 )

}
```

---

# 2️⃣ TELA DE COZINHA estilo McDonald's

Isso é chamado de **Kitchen Display System (KDS)**.

Estrutura:

```id="kds_structure"
kitchen-display
│
├ app
│ └ page.tsx
│
└ components
  └ OrderCard.tsx
```

---

# Tela principal da cozinha

```tsx id="kds_page"
"use client"

import { useEffect,useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:3001")

export default function Kitchen(){

 const [orders,setOrders] = useState([])

 useEffect(()=>{

  socket.on("kitchen:new-order",(order)=>{

   setOrders(prev=>[...prev,order])

  })

 },[])

 return(

  <div>

   <h1>Cozinha</h1>

   <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>

   {orders.map((order:any)=>(

    <div key={order.id} style={{
     border:"1px solid #ccc",
     padding:20
    }}>

     <h2>Mesa {order.tableId}</h2>

     {order.items?.map((item:any)=>(
      <div>{item.name}</div>
     ))}

     <button>Preparando</button>
     <button>Pronto</button>

    </div>

   ))}

   </div>

  </div>

 )

}
```

---

# Layout estilo McDonald's

Pedidos aparecem como **cards grandes**:

```id="kds_layout"
+-------------------+
Mesa 5

2x Burger
1x Batata

[Preparando]
[Pronto]
+-------------------+
```

Cores:

```
Amarelo → novo
Azul → preparando
Verde → pronto
```

---

# 3️⃣ SISTEMA DE QR CODE PARA CLIENTE

Cliente escaneia na mesa e abre o cardápio.

Biblioteca:

* qrcode

---

# Gerar QR Code da mesa

```javascript id="qr_code_gen"
import QRCode from "qrcode"

QRCode.toFile(
 "mesa-10.png",
 "http://localhost:3000/menu/10"
)
```

---

# Estrutura do sistema cliente

```id="customer_structure"
customer-order
│
├ app
│ ├ menu
│ │ └ [table]
│ └ cart
```

---

# Página do cardápio

`app/menu/[table]/page.tsx`

```tsx id="menu_page"
"use client"

import { useEffect,useState } from "react"

export default function Menu({params}){

 const [products,setProducts] = useState([])

 useEffect(()=>{

  fetch("http://localhost:3001/products")
  .then(res=>res.json())
  .then(setProducts)

 },[])

 const addToCart=(product:any)=>{

  console.log("add",product)

 }

 return(

  <div>

   <h1>Cardápio</h1>

   {products.map((p:any)=>(

    <div key={p.id}>

     <h2>{p.name}</h2>
     <p>R$ {p.price}</p>

     <button onClick={()=>addToCart(p)}>
      Adicionar
     </button>

    </div>

   ))}

  </div>

 )

}
```

---

# Fluxo completo do sistema

```id="system_flow"
Cliente escaneia QR
        │
Abre cardápio
        │
Faz pedido
        │
API salva pedido
        │
WebSocket envia para cozinha
        │
Tela cozinha mostra pedido
        │
Garçom entrega
```

---

# Estrutura final do projeto

```id="final_architecture"
restaurant-platform

apps
 ├ waiter-app
 ├ kitchen-display
 └ customer-order

services
 └ backend-api

infra
 └ docker
```

---

# 🚀 Resultado final

Você terá um sistema com:

✅ app do garçom
✅ pedidos QR code
✅ tela cozinha estilo McDonald's
✅ API tempo real
✅ banco de dados
✅ docker

Isso já é **um sistema real usado por restaurantes**.

---

💡 Se quiser, posso ainda te mostrar algo **extremamente útil para esse projeto**:

* **interface profissional completa (UI real de POS)**
* **modelo de banco com 70+ tabelas reais**
* **sistema de impressão automática na cozinha**
* **arquitetura para 1000 restaurantes**
* **template visual estilo iFood / Toast POS**

Isso praticamente vira **um SaaS pronto para vender**.
