package com.example.jpatest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAdminItemEntity is a Querydsl query type for AdminItemEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdminItemEntity extends EntityPathBase<AdminItemEntity> {

    private static final long serialVersionUID = 480283532L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAdminItemEntity adminItemEntity = new QAdminItemEntity("adminItemEntity");

    public final StringPath address = createString("address");

    public final MapPath<String, java.util.Map<String, String>, SimplePath<java.util.Map<String, String>>> businessHours = this.<String, java.util.Map<String, String>, SimplePath<java.util.Map<String, String>>>createMap("businessHours", String.class, java.util.Map.class, SimplePath.class);

    public final StringPath contact = createString("contact");

    public final StringPath features = createString("features");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final QLocalEntity local;

    public final StringPath touristSpotName = createString("touristSpotName");

    public QAdminItemEntity(String variable) {
        this(AdminItemEntity.class, forVariable(variable), INITS);
    }

    public QAdminItemEntity(Path<? extends AdminItemEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAdminItemEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAdminItemEntity(PathMetadata metadata, PathInits inits) {
        this(AdminItemEntity.class, metadata, inits);
    }

    public QAdminItemEntity(Class<? extends AdminItemEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.local = inits.isInitialized("local") ? new QLocalEntity(forProperty("local")) : null;
    }

}

