package com.example.jpatest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScheduler is a Querydsl query type for Scheduler
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScheduler extends EntityPathBase<Scheduler> {

    private static final long serialVersionUID = 1601332226L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScheduler scheduler = new QScheduler("scheduler");

    public final StringPath arrivalHour = createString("arrivalHour");

    public final StringPath arrivalMinute = createString("arrivalMinute");

    public final StringPath departureHour = createString("departureHour");

    public final StringPath departureMinute = createString("departureMinute");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath localIds = createString("localIds");

    public final QMember schedulerMemberId;

    public final StringPath spotIds = createString("spotIds");

    public final StringPath spotMarks = createString("spotMarks");

    public final StringPath stayIds = createString("stayIds");

    public final StringPath stayMarks = createString("stayMarks");

    public final StringPath trip_duration_end = createString("trip_duration_end");

    public final StringPath trip_duration_start = createString("trip_duration_start");

    public QScheduler(String variable) {
        this(Scheduler.class, forVariable(variable), INITS);
    }

    public QScheduler(Path<? extends Scheduler> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScheduler(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScheduler(PathMetadata metadata, PathInits inits) {
        this(Scheduler.class, metadata, inits);
    }

    public QScheduler(Class<? extends Scheduler> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.schedulerMemberId = inits.isInitialized("schedulerMemberId") ? new QMember(forProperty("schedulerMemberId")) : null;
    }

}

