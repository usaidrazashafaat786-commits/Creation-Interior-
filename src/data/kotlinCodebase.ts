export interface KotlinFile {
  name: string;
  path: string;
  content: string;
  description: string;
}

export const kotlinCodebase: KotlinFile[] = [
  {
    name: "build.gradle.kts",
    path: "app/build.gradle.kts",
    description: "App-level Gradle dependencies including Firebase, Jetpack Compose, and Navigation.",
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.google.gms.google-services)
}

android {
    namespace = "com.creationinteriors.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.creationinteriors.app"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Core Android & Compose
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    
    // Compose Navigation & Lifestyle ViewModel
    implementation("androidx.navigation:navigation-compose:2.7.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")

    // Firebase Authentication & Firestore
    implementation(platform("com.google.firebase:firebase-bom:32.8.0"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-firestore-ktx")

    // Coil for Image Loading from URL
    implementation("io.coil-kt:coil-compose:2.6.0")

    // Testing
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}`
  },
  {
    name: "Product.kt",
    path: "app/src/main/java/com/creationinteriors/app/model/Product.kt",
    description: "Data classes representing products, cart items, categories, and historic customer orders.",
    content: `package com.creationinteriors.app.model

import com.google.firebase.firestore.DocumentId

data class Product(
    @DocumentId val id: String = "",
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    val category: String = "",
    val imageUrl: String = "",
    val specifications: Map<String, String> = emptyMap(),
    val isAvailable: Boolean = true
)

data class CartItem(
    val product: Product = Product(),
    val quantity: Int = 1
)

data class Order(
    val orderId: String = "",
    val userId: String = "",
    val userEmail: String = "",
    val items: List<CartOrderItem> = emptyList(),
    val totalPrice: Double = 0.0,
    val timestamp: Long = System.currentTimeMillis(),
    val status: String = "Pending", // Pending, Dispatched, Delivered, Cancelled
    val deliveryPhone: String = "",
    val deliveryAddress: String = ""
)

data class CartOrderItem(
    val productId: String = "",
    val productName: String = "",
    val quantity: Int = 1,
    val unitPrice: Double = 0.0
)

enum class FurnitureCategory(val displayName: String) {
    SOFAS("Sofas"),
    BEDS("Beds"),
    DINING_TABLES("Dining Tables"),
    CHAIRS("Chairs"),
    WARDROBES("Wardrobes"),
    FOAM_PRODUCTS("Foam Products")
}`
  },
  {
    name: "Color.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/theme/Color.kt",
    description: "Elegant color palette for Creation Interiors, featuring primary gold accents and slate backdrops.",
    content: `package com.creationinteriors.app.ui.theme

import androidx.compose.ui.graphics.Color

// Premium Brass/Gold Palette for Creation Interiors
val BrassGold = Color(0xFFBF953F)
val SoftGold = Color(0xFFE5C07B)
val RichCharcoal = Color(0xFF1E1E1E)
val MatteBlack = Color(0xFF121212)
val SoftBgLight = Color(0xFFF9F9FA)
val ElegantGrey = Color(0xFF7D7F82)

// Light Theme Colours
val LightPrimary = Color(0xFF8A6D3B)
val LightOnPrimary = Color(0xFFFFFFFF)
val LightSecondary = Color(0xFF5A5C5E)
val LightBackground = Color(0xFFFDFCFA)
val LightSurface = Color(0xFFFFFFFF)
val LightOnBackground = Color(0xFF1F2021)
val LightOnSurface = Color(0xFF1F2021)

// Dark Theme Colours
val DarkPrimary = BrassGold
val DarkOnPrimary = Color(0xFF121212)
val DarkSecondary = SoftGold
val DarkBackground = MatteBlack
val DarkSurface = RichCharcoal
val DarkOnBackground = Color(0xFFF5F5F5)
val DarkOnSurface = Color(0xFFECECEC)`
  },
  {
    name: "Theme.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/theme/Theme.kt",
    description: "Jetpack Compose dynamic dark and light mode theme configuration.",
    content: `package com.creationinteriors.app.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = DarkPrimary,
    onPrimary = DarkOnPrimary,
    secondary = DarkSecondary,
    background = DarkBackground,
    surface = DarkSurface,
    onBackground = DarkOnBackground,
    onSurface = DarkOnSurface
)

private val LightColorScheme = lightColorScheme(
    primary = LightPrimary,
    onPrimary = LightOnPrimary,
    secondary = LightSecondary,
    background = LightBackground,
    surface = LightSurface,
    onBackground = LightOnBackground,
    onSurface = LightOnSurface
)

@Composable
fun CreationInteriorsTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography, // Ensure standard Material3 Typography imports
        content = content
    )
}`
  },
  {
    name: "AuthViewModel.kt",
    path: "app/src/main/java/com/creationinteriors/app/viewmodel/AuthViewModel.kt",
    description: "Firebase Authentication handling: login, registration, roles, and session persistence.",
    content: `package com.creationinteriors.app.viewmodel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class AuthViewModel : ViewModel() {
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()

    private val _currentUser = MutableStateFlow<FirebaseUser?>(auth.currentUser)
    val currentUser: StateFlow<FirebaseUser?> = _currentUser

    private val _isAdmin = MutableStateFlow(false)
    val isAdmin: StateFlow<Boolean> = _isAdmin

    val emailState = mutableStateOf("")
    val passwordState = mutableStateOf("")
    val isSignUpState = mutableStateOf(false)
    val loadingState = mutableStateOf(false)
    val errorState = mutableStateOf<String?>(null)

    init {
        checkAdminRole(auth.currentUser)
    }

    private fun checkAdminRole(user: FirebaseUser?) {
        if (user == null) {
            _isAdmin.value = false
            return
        }
        // Admin verification: In your firestore, specify trusted admin IDs
        // or check for email suffix or a specific document path /admins/uid
        firestore.collection("admins").document(user.uid)
            .get()
            .addOnSuccessListener { document ->
                _isAdmin.value = document.exists() || user.email == "cpro34023@gmail.com"
            }
            .addOnFailureListener {
                // Default fallback if admin collection missing is verifying hardcoded system admin email
                _isAdmin.value = user.email == "cpro34023@gmail.com"
            }
    }

    fun handleAuthAction(onSuccess: () -> Unit) {
        val email = emailState.value.trim()
        val password = passwordState.value.trim()

        if (email.isEmpty() || password.isEmpty()) {
            errorState.value = "Fields cannot be empty."
            return
        }

        loadingState.value = true
        errorState.value = null

        if (isSignUpState.value) {
            auth.createUserWithEmailAndPassword(email, password)
                .addOnSuccessListener { result ->
                    val user = result.user
                    _currentUser.value = user
                    // Store user record in Firestore
                    user?.let {
                        val userData = mapOf("email" to it.email, "uid" to it.uid, "isAdmin" to false)
                        firestore.collection("users").document(it.uid).set(userData)
                    }
                    checkAdminRole(user)
                    loadingState.value = false
                    onSuccess()
                }
                .addOnFailureListener { exception ->
                    errorState.value = exception.localizedMessage ?: "Registration failed."
                    loadingState.value = false
                }
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .addOnSuccessListener { result ->
                    val user = result.user
                    _currentUser.value = user
                    checkAdminRole(user)
                    loadingState.value = false
                    onSuccess()
                }
                .addOnFailureListener { exception ->
                    errorState.value = exception.localizedMessage ?: "Login failed."
                    loadingState.value = false
                }
        }
    }

    fun logout() {
        auth.signOut()
        _currentUser.value = null
        _isAdmin.value = false
        emailState.value = ""
        passwordState.value = ""
    }
}`
  },
  {
    name: "FurnitureViewModel.kt",
    path: "app/src/main/java/com/creationinteriors/app/viewmodel/FurnitureViewModel.kt",
    description: "Comprehensive Firestore management covering live product catalogs, cart logic, and checkout ordering.",
    content: `package com.creationinteriors.app.viewmodel

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.creationinteriors.app.model.*
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class FurnitureViewModel : ViewModel() {
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()

    private val _products = MutableStateFlow<List<Product>>(emptyList())
    val products: StateFlow<List<Product>> = _products

    private val _orders = MutableStateFlow<List<Order>>(emptyList())
    val orders: StateFlow<List<Order>> = _orders

    private val _cartItems = MutableStateFlow<List<CartItem>>(emptyList())
    val cartItems: StateFlow<List<CartItem>> = _cartItems

    val searchQuery = mutableStateOf("")
    val selectedCategory = mutableStateOf<String?>(null)
    val maxPriceFilter = mutableStateOf(50000.0) // customisable boundaries
    val isLoading = mutableStateOf(false)
    val adminErrorState = mutableStateOf<String?>(null)

    init {
        fetchProducts()
        seedSampleDataIfEmpty()
    }

    fun fetchProducts() {
        isLoading.value = true
        firestore.collection("products")
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    isLoading.value = false
                    return@addSnapshotListener
                }
                if (snapshot != null) {
                    val list = snapshot.toObjects(Product::class.java)
                    _products.value = list
                }
                isLoading.value = false
            }
    }

    fun fetchUserOrders(userId: String) {
        firestore.collection("orders")
            .whereEqualTo("userId", userId)
            .orderBy("timestamp", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, error ->
                if (snapshot != null) {
                    val list = snapshot.toObjects(Order::class.java)
                    _orders.value = list
                }
            }
    }

    fun fetchAllOrdersAdmin() {
        firestore.collection("orders")
            .orderBy("timestamp", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null) {
                    val list = snapshot.toObjects(Order::class.java)
                    _orders.value = list
                }
            }
    }

    // CART OPERATIONS
    fun addToCart(product: Product) {
        val currentList = _cartItems.value.toMutableList()
        val existingIndex = currentList.indexOfFirst { it.product.id == product.id }
        if (existingIndex != -1) {
            val existing = currentList[existingIndex]
            currentList[existingIndex] = existing.copy(quantity = existing.quantity + 1)
        } else {
            currentList.add(CartItem(product = product, quantity = 1))
        }
        _cartItems.value = currentList
    }

    fun updateCartQuantity(productId: String, change: Int) {
        val currentList = _cartItems.value.toMutableList()
        val index = currentList.indexOfFirst { it.product.id == productId }
        if (index != -1) {
            val newQty = currentList[index].quantity + change
            if (newQty <= 0) {
                currentList.removeAt(index)
            } else {
                currentList[index] = currentList[index].copy(quantity = newQty)
            }
        }
        _cartItems.value = currentList
    }

    fun removeFromCart(productId: String) {
        _cartItems.value = _cartItems.value.filter { it.product.id != productId }
    }

    fun clearCart() {
        _cartItems.value = emptyList()
    }

    fun getTotalCartPrice(): Double {
        return _cartItems.value.sumOf { it.product.price * it.quantity }
    }

    // CHECKOUT & WHATSAPP
    fun placeOrder(
        userId: String,
        userEmail: String,
        phone: String,
        address: String,
        onSuccess: (String) -> Unit // returns serialized WhatsApp order summary
    ) {
        if (_cartItems.value.isEmpty()) return

        val orderItems = _cartItems.value.map {
            CartOrderItem(
                productId = it.product.id,
                productName = it.product.name,
                quantity = it.quantity,
                unitPrice = it.product.price
            )
        }

        val total = getTotalCartPrice()
        val newOrderDoc = firestore.collection("orders").document()
        val order = Order(
            orderId = newOrderDoc.id,
            userId = userId,
            userEmail = userEmail,
            items = orderItems,
            totalPrice = total,
            deliveryPhone = phone,
            deliveryAddress = address,
            timestamp = System.currentTimeMillis()
        )

        newOrderDoc.set(order)
            .addOnSuccessListener {
                clearCart()
                // Format order message for WhatsApp
                val whatsappMsg = formatOrderWhatsAppMsg(order)
                onSuccess(whatsappMsg)
            }
    }

    private fun formatOrderWhatsAppMsg(order: Order): String {
        val sb = StringBuilder()
        sb.append("🛋️ *New Order from Creation Interiors!*\n")
        sb.append("Order ID: " + "$" + "{order.orderId}\n")
        sb.append("Customer: " + "$" + "{order.userEmail}\n")
        sb.append("PhoneContact: " + "$" + "{order.deliveryPhone}\n")
        sb.append("Address: " + "$" + "{order.deliveryAddress}\n\n")
        sb.append("*Items Ordered:*\n")
        order.items.forEach { item ->
            sb.append("• " + "$" + "{item.productName} (x" + "$" + "{item.quantity}) - ₹" + "$" + "{item.unitPrice * item.quantity}\n")
        }
        sb.append("\n*Grand Total:* ₹" + "$" + "{order.totalPrice}\n")
        sb.append("Please configure this order and contact me back. Thank you!")
        return sb.toString()
    }

    // ADMIN CATALOG CRUD
    fun addProduct(product: Product, onSuccess: () -> Unit) {
        adminErrorState.value = null
        val docRef = firestore.collection("products").document()
        val finalProduct = product.copy(id = docRef.id)
        docRef.set(finalProduct)
            .addOnSuccessListener { onSuccess() }
            .addOnFailureListener { adminErrorState.value = it.localizedMessage }
    }

    fun updateProduct(product: Product, onSuccess: () -> Unit) {
        adminErrorState.value = null
        if (product.id.isEmpty()) return
        firestore.collection("products").document(product.id)
            .set(product)
            .addOnSuccessListener { onSuccess() }
            .addOnFailureListener { adminErrorState.value = it.localizedMessage }
    }

    fun deleteProduct(productId: String, onSuccess: () -> Unit) {
        adminErrorState.value = null
        firestore.collection("products").document(productId)
            .delete()
            .addOnSuccessListener { onSuccess() }
            .addOnFailureListener { adminErrorState.value = it.localizedMessage }
    }

    fun updateOrderStatus(orderId: String, newStatus: String) {
        firestore.collection("orders").document(orderId)
            .update("status", newStatus)
    }

    // SEED SAMPLE PRODUCTS IF FIREBASE DB WAS JUST PROVISIONED
    private fun seedSampleDataIfEmpty() {
        firestore.collection("products").get().addOnSuccessListener { snapshot ->
            if (snapshot.isEmpty) {
                val samples = listOf(
                    Product(
                        name = "Royal Velvet Sectional",
                        description = "Ultra-premium L-shaped sofa wrapped in deep royal blue plush velvet fabric. Generous cushions with high density rebound foam provide unmatched relaxation.",
                        price = 45999.0,
                        category = "Sofas",
                        imageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80"
                    ),
                    Product(
                        name = "King Sized Teakwood Bedstead",
                        description = "Solid master-grade teakwood bed frame with custom premium upholstered headboard and golden brass accents. Extremely durable minimalist construction.",
                        price = 38999.0,
                        category = "Beds",
                        imageUrl = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&auto=format&fit=crop&q=80"
                    ),
                    Product(
                        name = "Scandi Marble Dining Set",
                        description = "Gleaming polished white marble tabletop dining suite with solid oak timber frames and 6 upholstered linen chairs.",
                        price = 29999.0,
                        category = "Dining Tables",
                        imageUrl = "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500&auto=format&fit=crop&q=80"
                    ),
                    Product(
                        name = "Fitted Sliding Wardrobe",
                        description = "Modern space saving sliding wardrobe with massive full height mirror doors and customizable compartmentalized inner shelving layouts.",
                        price = 34999.0,
                        category = "Wardrobes",
                        imageUrl = "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&auto=format&fit=crop&q=80"
                    ),
                    Product(
                        name = "Ergonomic Lounge Armchair",
                        description = "Architectural design aesthetic accent chair. Premium top-grain tan leather with contoured memory foam padding and steel wireframe base.",
                        price = 14500.0,
                        category = "Chairs",
                        imageUrl = "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=80"
                    ),
                    Product(
                        name = "Therapeutic Orthopedic Foam Mattress",
                        description = "Premium triple layer multi-density memory and pure latex workspace foam mattress with breathable aloe-vera knitted cover.",
                        price = 18999.0,
                        category = "Foam Products",
                        imageUrl = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=80"
                    )
                )
                for (prod in samples) {
                    addProduct(prod) {}
                }
            }
        }
    }
}`
  },
  {
    name: "HomeScreen.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/screens/HomeScreen.kt",
    description: "Jetpack Compose view for the digital interior catalog. Includes dynamic search and banners.",
    content: `package com.creationinteriors.app.ui.screens

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.creationinteriors.app.model.FurnitureCategory
import com.creationinteriors.app.model.Product
import com.creationinteriors.app.viewmodel.FurnitureViewModel

@OptIn(ExperimentalFoundationApi::class, ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: FurnitureViewModel,
    onNavigateToDetail: (String) -> Unit,
    onNavigateToCart: () -> Unit
) {
    val products by viewModel.products.collectAsState()
    val searchQuery by viewModel.searchQuery
    val selectedCategory by viewModel.selectedCategory
    
    // Banner Promos
    val promoBanners = listOf(
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000"
    )
    val pagerState = rememberPagerState(pageCount = { promoBanners.size })

    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text("Creation Interiors", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary) 
                },
                actions = {
                    IconButton(onClick = onNavigateToCart) {
                        BadgedBox(
                            badge = { 
                                val amount = viewModel.cartItems.collectAsState().value.size
                                if(amount > 0) {
                                    Badge { Text(amount.toString()) } 
                                }
                            }
                        ) {
                            Icon(Icons.Filled.ShoppingCart, contentDescription = "View Cart")
                        }
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Search Input
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { viewModel.searchQuery.value = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                placeholder = { Text("Search furniture items...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                shape = RoundedCornerShape(24.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary
                )
            )

            // Dynamic Banner Slider
            HorizontalPager(
                state = pagerState,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
                    .padding(horizontal = 16.dp, vertical = 8.dp)
                    .clip(RoundedCornerShape(16.dp))
            ) { page ->
                AsyncImage(
                    model = promoBanners[page],
                    contentDescription = "Furniture Banner Promo",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            }

            // Categories horizontal slider
            Text(
                "Filter by Category",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 16.dp, top = 16.dp, bottom = 8.dp)
            )

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .background(Color.Transparent),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // 'All' filter chip
                FilterChip(
                    selected = selectedCategory == null,
                    onClick = { viewModel.selectedCategory.value = null },
                    label = { Text("All") }
                )
                
                FurnitureCategory.values().take(3).forEach { cat ->
                    FilterChip(
                        selected = selectedCategory == cat.displayName,
                        onClick = { viewModel.selectedCategory.value = cat.displayName },
                        label = { Text(cat.displayName) }
                    )
                }
            }

            // Products Grid view
            Text(
                "Exclusive Collections",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 16.dp, top = 16.dp, bottom = 8.dp)
            )

            val filteredProducts = products.filter {
                (selectedCategory == null || it.category == selectedCategory) &&
                (searchQuery.isEmpty() || it.name.contains(searchQuery, ignoreCase = true))
            }

            if (filteredProducts.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text("No premium furniture items match your search.", color = Color.Gray)
                }
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    items(filteredProducts) { item ->
                        CatalogCard(product = item, onClick = { onNavigateToDetail(item.id) })
                    }
                }
            }
        }
    }
}

@Composable
fun CatalogCard(product: Product, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(12.dp)
    ) {
        Column {
            AsyncImage(
                model = product.imageUrl,
                contentDescription = product.name,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(130.dp)
            )
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    product.name,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    product.category,
                    style = MaterialTheme.typography.bodySmall,
                    color = Color.Gray
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    "₹" + "$" + "{product.price}",
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.primary,
                    style = MaterialTheme.typography.titleLarge
                )
            }
        }
    }
}`
  },
  {
    name: "ProductDetailScreen.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/screens/ProductDetailScreen.kt",
    description: "Jetpack Compose view displaying granular details, specs lists, high-res image panel, and Cart management triggers.",
    content: `package com.creationinteriors.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.creationinteriors.app.viewmodel.FurnitureViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    productId: String,
    viewModel: FurnitureViewModel,
    onBack: () -> Unit
) {
    val products by viewModel.products.collectAsState()
    val product = products.find { it.id == productId }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(product?.name ?: "Product Details") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Go Back")
                    }
                }
            )
        }
    ) { innerPadding ->
        if (product == null) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Furniture product not loaded.")
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .verticalScroll(rememberScrollState())
            ) {
                AsyncImage(
                    model = product.imageUrl,
                    contentDescription = product.name,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(280.dp)
                )

                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        product.name,
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        product.category,
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.SemiBold
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        "₹" + "$" + "{product.price}",
                        style = MaterialTheme.typography.headlineLarge,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.primary
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        "Product Description",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        product.description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.Gray,
                        lineHeight = MaterialTheme.typography.bodyMedium.lineHeight * 1.2
                    )

                    Spacer(modifier = Modifier.height(24.dp))

                    Button(
                        onClick = { viewModel.addToCart(product) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(50.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.primary
                        )
                    ) {
                        Text(
                            "Add to Shopping Cart",
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                }
            }
        }
    }
}`
  },
  {
    name: "CartScreen.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/screens/CartScreen.kt",
    description: "Compose Shopping Cart screen with dynamic count triggers, delivery inputs, and explicit WhatsApp redirection actions.",
    content: `package com.creationinteriors.app.ui.screens

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.creationinteriors.app.model.CartItem
import com.creationinteriors.app.viewmodel.FurnitureViewModel
import java.net.URLEncoder

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartScreen(
    userId: String,
    userEmail: String,
    viewModel: FurnitureViewModel,
    onBack: () -> Unit
) {
    val cartItems by viewModel.cartItems.collectAsState()
    val context = LocalContext.current

    var deliveryPhone by remember { mutableStateOf("") }
    var deliveryAddress by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Creation Interiors Shopping Cart") }
            )
        }
    ) { innerPadding ->
        if (cartItems.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize().padding(innerPadding),
                contentAlignment = Alignment.Center
            ) {
                Text("Your cart is empty. Browse standard furniture to add items.")
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                LazyColumn(
                    modifier = Modifier.weight(1f),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(cartItems) { item ->
                        CartRow(item = item, viewModel = viewModel)
                    }
                }

                Divider()

                // Delivery Forms Panel
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        "Shipping & Order Details",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = deliveryPhone,
                        onValueChange = { deliveryPhone = it },
                        modifier = Modifier.fillMaxWidth(),
                        label = { Text("WhatsApp Contact Phone") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = deliveryAddress,
                        onValueChange = { deliveryAddress = it },
                        modifier = Modifier.fillMaxWidth(),
                        label = { Text("Delivery Address Details") }
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Subtotal", style = MaterialTheme.typography.bodyLarge)
                        Text(
                            "₹" + "$" + "{viewModel.getTotalCartPrice()}",
                            fontWeight = FontWeight.ExtraBold,
                            style = MaterialTheme.typography.headlineSmall,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            if (deliveryPhone.isEmpty() || deliveryAddress.isEmpty()) {
                                Toast.makeText(context, "Please complete shipping fields.", Toast.LENGTH_SHORT).show()
                                return@Button
                            }
                            viewModel.placeOrder(
                                userId = userId,
                                userEmail = userEmail,
                                phone = deliveryPhone,
                                address = deliveryAddress
                            ) { whatsappMessage ->
                                // Trigger actual WhatsApp Order placement
                                sendWhatsAppDetails(context, whatsappMessage)
                            }
                        },
                        modifier = Modifier.fillMaxWidth().height(50.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)) // WhatsApp brand green
                    ) {
                        Text(
                            "Place Order on WhatsApp",
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                    }
                }
            }
        }
    }
}

private fun sendWhatsAppDetails(context: Context, msg: String) {
    val encodedMsg = URLEncoder.encode(msg, "UTF-8")
    // Replace with your true registered furniture business contact number
    val businessNumber = "923379929157" 
    val uri = Uri.parse("https://api.whatsapp.com/send?phone=" + "$" + "{businessNumber}&text=" + "$" + "{encodedMsg}")
    val intent = Intent(Intent.ACTION_VIEW, uri)
    try {
        context.startActivity(intent)
    } catch (e: Exception) {
        Toast.makeText(context, "WhatsApp is not installed on this device.", Toast.LENGTH_LONG).show()
    }
}

@Composable
fun CartRow(item: CartItem, viewModel: FurnitureViewModel) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp)
    ) {
        Row(
            modifier = Modifier.padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = item.product.imageUrl,
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier.size(70.dp).clip(RoundedCornerShape(8.dp))
            )

            Spacer(modifier = Modifier.width(16.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(item.product.name, fontWeight = FontWeight.Bold)
                Text("₹" + "$" + "{item.product.price}", color = MaterialTheme.colorScheme.primary)
                
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(top = 4.dp)
                ) {
                    TextButton(onClick = { viewModel.updateCartQuantity(item.product.id, -1) }) {
                        Text("-", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyLarge)
                    }
                    Text(
                        item.quantity.toString(),
                        modifier = Modifier.padding(horizontal = 8.dp),
                        fontWeight = FontWeight.Bold
                    )
                    TextButton(onClick = { viewModel.updateCartQuantity(item.product.id, 1) }) {
                        Text("+", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyLarge)
                    }
                }
            }

            IconButton(onClick = { viewModel.removeFromCart(item.product.id) }) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "Remove Item",
                    tint = Color.Red
                )
            }
        }
    }
}`
  },
  {
    name: "AdminScreen.kt",
    path: "app/src/main/java/com/creationinteriors/app/ui/screens/AdminScreen.kt",
    description: "Jetpack Compose Admin portal to trigger instant Firestore deletions, catalog insertions, and status updates.",
    content: `package com.creationinteriors.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.creationinteriors.app.model.FurnitureCategory
import com.creationinteriors.app.model.Product
import com.creationinteriors.app.viewmodel.FurnitureViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminScreen(
    viewModel: FurnitureViewModel,
    onBack: () -> Unit
) {
    val products by viewModel.products.collectAsState()
    
    var showDialog by remember { mutableStateOf(false) }
    var editingProduct by remember { mutableStateOf<Product?>(null) }

    var pName by remember { mutableStateOf("") }
    var pPrice by remember { mutableStateOf("") }
    var pCategory by remember { mutableStateOf("Sofas") }
    var pDesc by remember { mutableStateOf("") }
    var pImgUrl by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Manager Control Board") },
                actions = {
                    IconButton(onClick = {
                        editingProduct = null
                        pName = ""
                        pPrice = ""
                        pCategory = "Sofas"
                        pDesc = ""
                        pImgUrl = ""
                        showDialog = true
                    }) {
                        Icon(Icons.Filled.Add, contentDescription = "Add New Furniture")
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(products) { item ->
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(item.name, fontWeight = FontWeight.Bold)
                                Text("₹" + "$" + "{item.price} | " + "$" + "{item.category}", color = MaterialTheme.colorScheme.primary)
                            }
                            Row {
                                IconButton(onClick = {
                                    editingProduct = item
                                    pName = item.name
                                    pPrice = item.price.toString()
                                    pCategory = item.category
                                    pDesc = item.description
                                    pImgUrl = item.imageUrl
                                    showDialog = true
                                }) {
                                    Icon(Icons.Filled.Edit, contentDescription = "Edit Product")
                                }
                                IconButton(onClick = { viewModel.deleteProduct(item.id) {} }) {
                                    Icon(Icons.Filled.Delete, contentDescription = "Delete Product", tint = Color.Red)
                                }
                            }
                        }
                    }
                }
            }

            if (showDialog) {
                AlertDialog(
                    onDismissRequest = { showDialog = false },
                    title = { Text(if (editingProduct == null) "Create Furniture" else "Update Furniture") },
                    text = {
                        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(value = pName, onValueChange = { pName = it }, label = { Text("Furniture Title") })
                            OutlinedTextField(value = pPrice, onValueChange = { pPrice = it }, label = { Text("Price (₹)") })
                            OutlinedTextField(value = pDesc, onValueChange = { pDesc = it }, label = { Text("Detailed Specifications") })
                            OutlinedTextField(value = pImgUrl, onValueChange = { pImgUrl = it }, label = { Text("HQ Photo Url") })
                        }
                    },
                    confirmButton = {
                        Button(onClick = {
                            val finalProd = Product(
                                id = editingProduct?.id ?: "",
                                name = pName,
                                price = pPrice.toDoubleOrNull() ?: 1000.0,
                                category = pCategory,
                                description = pDesc,
                                imageUrl = pImgUrl
                            )
                            if (editingProduct == null) {
                                viewModel.addProduct(finalProd) { showDialog = false }
                            } else {
                                viewModel.updateProduct(finalProd) { showDialog = false }
                            }
                        }) {
                            Text("Apply")
                        }
                    },
                    dismissButton = {
                        TextButton(onClick = { showDialog = false }) { Text("Cancel") }
                    }
                )
            }
        }
    }
}`
  }
];
